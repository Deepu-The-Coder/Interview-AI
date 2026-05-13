const {GoogleGenAI} = require("@google/genai")
const z = require("zod")
// const  { zodToJsonSchema } = require("zod-to-json-schema");   iski koi jarurat nahi
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job.describe"),
    technicalQuestions: z.array(z.object({
        question:z.string().describe("The technical question can be asked in the interview2"),
        intention:z.string().describe("The intention of interviewer behind asking this question"),
        answer:z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question:z.string().describe("The technical question can be asked in the interview2"),
        intention:z.string().describe("The intention of interviewer behind asking this question"),
        answer:z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which candidate is lacking"),
        severity: z.enum(["low","medium","high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job applied by the applicant .")
    })).describe("List of skill gaps in the candidate's profile along with their severity."),
    preparationPlan: z.array(z.object({
        phase:z.number().describe("The phase number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this phase in the preparation plan, e.g. data structures, system design, mock interview etc"),
        tasks:z.array(z.string()).describe("List of tasks to be done on this phase to follow the preparation plan e.g. read a specific book or do a course etc")
    })).describe("A phases-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated")
})

async function generateInterviewReport({resume,selfDescription, jobDescription}){

    const prompt = `Generate an interview report for a candidate with the following detais:
                    Resume: ${resume}
                    Self Description:${selfDescription}
                    Job Description: ${jobDescription}
    `
    const response =  await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        // model: "gemini-1.5-flash",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseJsonSchema:z.toJSONSchema(interviewReportSchema),
        }

    })
    return JSON.parse(response.text)
   
}
async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        headless: true, // Must be true in a server environment
        args: [
            "--no-sandbox", 
            "--disable-setuid-sandbox", 
            "--disable-dev-shm-usage", // Prevents memory crashes on Render's 512MB RAM
            "--single-process"         // Keeps resource usage low
        ],
        // If you still get "Chrome not found", explicitly set this path:
        // executablePath: '/usr/bin/google-chrome-stable' 
    });
    try {
        const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "5mm",
            bottom: "5mm",
            left: "10mm",
            right: "10mm"
        }
    })

    return pdfBuffer
    } catch (error) {
        console.log(error)
    }
    finally{
        await browser.close()
    }

}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt =          `Generate a professional resume in HTML format.
                                Details:
                                Resume Data: ${resume}
                                Self Description: ${selfDescription}
                                Job Description: ${jobDescription}

                                CRITICAL CSS RULES TO PREVENT TEXT CUT-OFF:
                                1. Wrap the entire content in a <div class="resume-container">.
                                2. Use this CSS: 
                                * { box-sizing: border-box; }
                                body { margin: 0; padding: 0; font-family: 'Arial', sans-serif; }
                                .resume-container { 
                                    width: 100%; 
                                    max-width: 100%; 
                                    overflow-wrap: break-word; 
                                    word-wrap: break-word; 
                                    word-break: normal; 
                                }
                                p, li, span { line-height: 1.5; white-space: pre-line; }

                                The resume must be ATS-friendly, professional, and highlight relevant experience for the JD. 
                                Ensure no elements have fixed pixel widths (like width: 800px). Use width: 100% instead.
                                Return only a JSON object with the "html" field.`;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: z.toJSONSchema(resumePdfSchema),
        }
    })


    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}

module.exports = { generateInterviewReport, generateResumePdf }
