const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    city:String,
    password:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Inactive"
    }
})

const Userdb = mongoose.model("userdb", schema);

module.exports = Userdb;