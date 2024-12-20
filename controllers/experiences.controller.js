const ExperienceModel = require("../models/Experience.model")


const getAll = async (req, res) => {

  let data = await ExperienceModel.find({user_id : req.auth._id})
  .populate({path : "user_id" , select:"email firstName"})
  res.send(data)
}

const create = async (req, res) => {

  let item = new ExperienceModel(req.body)
  item.user_id = req.auth._id
  try {
    await item.save()
    res.send(item)
  } catch (err) {
    res.status(444).send(err)
  }
}

const update = (req,res)=>{
  ExperienceModel.updateOne({_id : req.params.id , user_id : req.auth._id} ,req.body)
  .then(result=>res.send(result))
  .catch(err=>res.status(444).send(err))
}

const remove = (req,res)=>{
  ExperienceModel.deleteOne({_id : req.params.id , user_id : req.auth._id})
  .then(result=>res.send(result))
  .catch(err=>res.status(444).send(err))
}



module.exports = { getAll, create ,update , remove }