const mongoose = require('mongoose')
const UserModel = require('./User.model')

const schema  = mongoose.Schema({
    name : {type : String , required : true}
})

module.exports = mongoose.model('Skill' , schema)