const bcrypt = require('bcryptjs')
const UserModel = require('../models/User.model')

exports.register = (req,res)=>{

    console.log(req.body)
    UserModel.findOne({email : req.body.email})
    .then(user=>{
        
        if(user){
            res.status(422).send({message : 'Email Exist'})
        }else{
           
            //1 : generer clé privé : salt , avec puissance entre 10 et 20
           
            bcrypt.genSalt(10).then((key)=>{
               
                //2. generer mot de passe hashé
                bcrypt.hash(req.body.password , key).then(hashedPwd=>{
                    let new_user = new UserModel(req.body);
                    new_user.password = hashedPwd
                    console.log(new_user)
                    new_user.save().then(()=>res.send(new_user))
                }).catch(err =>res.status(440).send(err))
            }).catch(err =>res.status(443).send(err))
        }
    }).catch(err =>res.status(444).send(err))
}


exports.log