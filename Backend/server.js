require("dotenv").config() //we can use .env files content now
const app = require("./src/app.js")
const connectToDB = require("./src/config/db.js")


const dns = require('dns')
dns.setServers(['1.1.1.1', '8.8.8.8']);
connectToDB()

app.get('/', (req, res) => {
  res.send('API is running 🚀')
})
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Server is running at Port 3000");

})