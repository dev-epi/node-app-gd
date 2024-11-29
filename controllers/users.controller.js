const UserModel = require("../models/User.model")

const getAll = async (req, res) => {
  let users = await UserModel.find()
  res.send(users)
}

const create = async (req, res) => {
  let user = new UserModel(req.body)

  let f = req.files ? req.files.avatar : null
  if(f && f.type && f.type.includes('image')){
      user.image = f
  }
  try {
    await user.save()
    res.send(user)
  } catch (err) {
    res.status(444).send(err)
  }
}


const update = (req,res)=>{
  console.log(req.files)
  let user = req.body
  if(req.files && req.files.image){
    user.image = req.files.image
  }
  UserModel.updateOne({_id : req.params.id} ,user)
  .then(result=>res.send(result))
  .catch(err=>res.status(444).send(err))
}

const remove = (req,res)=>{
  UserModel.deleteOne({_id : req.params.id})
  .then(result=>res.send(result))
  .catch(err=>res.status(444).send(err))
}



module.exports = { getAll, create ,update , remove }