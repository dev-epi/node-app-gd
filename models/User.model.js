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
    }
})

schema.pre('save' , async function(next){
    let user = this
    console.log(user)
    console.log('pre')
    user.password = '12345'
    next()
})

module.exports = mongoose.model('User' , schema)