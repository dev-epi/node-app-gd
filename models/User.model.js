const mongoose = require('mongoose')

const schema  = mongoose.Schema({
    firstName : String,
    lastName : {type : String , default : ''},
    email : {type : String , required : true , unique : true},
    birthdate : Date,
    image :{
        path : String,
        size : String
    }
})

module.exports = mongoose.model('User' , schema)