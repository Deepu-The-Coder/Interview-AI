const {GoogleGenAI} = require("@google/genai")
const z = require("zod")
// const  { zodToJsonSchema } = require("zod-to-json-schema");   iski koi jarurat nahi


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
        day:z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interview etc"),
        tasks:z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan e.g. read a specific book or do a course etc")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
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
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseJsonSchema:z.toJSONSchema(interviewReportSchema),
        }

    })
    return JSON.parse(response.text)
   
}

module.exports= generateInterviewReport