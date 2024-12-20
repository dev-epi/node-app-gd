const SkillModel = require("../models/Skill.model")


const getAll = async (req, res) => {
  let data = await SkillModel.find().populate({path : "user_id" , select:"email firstName"})
  res.send(data)
}

const create = async (req, res) => {
  let item = new SkillModel(req.body)

  try {
    await item.save()
    res.send(item)
  } catch (err) {
    res.status(444).send(err)
  }
}

const update = (req,res)=>{
  SkillModel.updateOne({_id : req.params.id} ,req.body)
  .then(result=>res.send(result))
  .catch(err=>res.status(444).send(err))
}

const remove = (req,res)=>{
  SkillModel.deleteOne({_id : req.params.id})
  .then(result=>res.send(result))
  .catch(err=>res.status(444).send(err))
}



module.exports = { getAll, create ,update , remove }