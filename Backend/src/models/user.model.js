const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique:[true, "username already taken"],
        required:true
    },
    email:{
        type: String,
        unique:[true, "Account already exists with this email address"],
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const userModel = mongoose.model("users" , userSchema)
//.model tells that where the user's data will get stored
//it will store in users collection and schema will be userSchema

module.exports=userModel