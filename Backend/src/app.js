//work of this file 
//generate instance of server
//using middleware, api,routes

const cors = require("cors")
const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

// app.use(...) → tells Express to use that middleware for every request
// express.json() → built-in middleware that parses JSON data
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://resume-interview-ai.vercel.app",
    credentials:true
}))


/* using all the routes here */
const authRouter = require("./routes/auth.routes")
app.use("/api/auth", authRouter)

const interviewRouter = require("./routes/interview.routes")
app.use("/api/interview", interviewRouter)



module.exports = app