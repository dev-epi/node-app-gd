const mongoose = require('mongoose')
const UserModel = require('./User.model')

const schema  = mongoose.Schema({
    title : String,
    company : String,
    start_date : Date,
    end_date : Date,
    description : String,
    user_id : {type : mongoose.Types.ObjectId , ref:UserModel}
})

module.exports = mongoose.model('Experience' , schema)