const pdfParse = require("pdf-parse")
const generateInterviewReport =require("../services/ai.sevice")
const interviewReportModel = require("../models/interviewReport.model")

async function generateInterviewController(req,res){
    //here we will get multiple pages of pdf in resumeContent
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const {selfDescription,jobDescription}= req.body

    const interviewReportByAi = await generateInterviewReport({
        resume:resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user:req.user.id,
        resume: resumeContent.text, // to get whole content of pdf at once
        selfDescription,
        jobDescription,
        ...interviewReportByAi  //destructuring
    })

    res.status(201).json({
        message:"Interview report generated successfully.",
        interviewReport
    })
}


module.exports={generateInterviewController}