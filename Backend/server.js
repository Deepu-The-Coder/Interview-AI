require("dotenv").config() //we can use .env files content now
const app = require("./src/app.js")
const connectToDB = require("./src/config/db.js")


const dns = require('dns')
dns.setServers(['1.1.1.1', '8.8.8.8']);
connectToDB()


app.listen(3000,()=>{
    console.log("Server is running at Port 3000");

})