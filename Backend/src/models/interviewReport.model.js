const mongoose = require("mongoose")

/**
 * User Provides
 * -job desctiption schema: String
 * - resume text : String
 * -self description:String
 * 
 * match-score:Number
 * 
 * 
 * Ai gives
 * Technical questions :
 *          [{
 *              question:""
 *              intention:""
 *              answer:""
 *          }] 
 * behaviour questions:
 *          [{
 *              question:""
 *              intention:""
 *              answer:""
 *          }] 
 * skillgaps:[{
 *             skill:""
 *              severity:{
 *                      type:String,
 *                      enum:["low", "medium", "high"]
 *} 
 *}]
 * preparation plan:[{
 *              phase:Number
 *              focus: String
 *              tasks:[String]             
 * }]
 */
const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true, "Technical question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true, "Answer is required"]
    }
},{
    _id:false   //we are not storing it anywhere (why waste storage on this)
})
const behavioralQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true, "Technical question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true, "Answer is required"]
    }
},{
    _id:false   //we are not storing it anywhere (why waste storage on this)
})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"Skill is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:[true, "Severity is required"]
    }
},{
    _id:false
})

const preparationPlanSchema = new mongoose.Schema({
    phase:{
        type:Number,
        required:[true, "Phase is required"]
    },
    focus:{
        type:String,
        required:[true,"Focus is required"]
    },
    tasks:[{
        type:String,
        required:[true,"Task is required"]
    }]
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"Job description is required"]
    },
    resume:{
        type:String
    },
    selfDescription:{
        type:String
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestions:[technicalQuestionSchema],
    behavioralQuestions:[behavioralQuestionSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"   //users  collection goes to reference
    },
     title:{
            type:String,
            required:[true, "Job title is required"]
        }
    
},
{
    timestamps:true
})

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

module.exports= interviewReportModel