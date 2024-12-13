const mongoose = require('mongoose')

const schema  = mongoose.Schema({
    firstName : String,
    lastName : {type : String , default : ''},
    email : {type : String , required : true , unique : true},
    birthdate : Date,
    password : String,
    image :{
        path : String,
        name : String,
        size : String
    },
    resetCode : String,
    resetTimeout : Date
})



module.exports = mongoose.model('User' , schema)