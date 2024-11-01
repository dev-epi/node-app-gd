const UserModel = require("../models/User.model")

const getAll = async (req, res) => {
  let users = await UserModel.find()
  res.send(users)
}

const create = async (req, res) => {
  let user = new UserModel(req.body)

  try {
    await user.save()
    res.send(user)
  } catch (err) {
    res.status(444).send(err)
  }
 
}





module.exports = { getAll, create }