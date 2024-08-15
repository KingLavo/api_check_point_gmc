const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name:{
        type: String,
        require: true
    },
    age:{
        type: Number,
        require: true
    }, 
    email:{
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minLength: 4
    }
})



const User = mongoose.model("User", userSchema)

module.exports = User;