const bcrypt = require('bcryptjs')
const UserModel = require('../models/User.model')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const nodemailer = require('nodemailer')
const { transporter } = require('./mailConfig')
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


exports.login = async(req,res)=>{

    let {email , password} = req.body
    
    if(email && password){
        try{
            let user = await UserModel.findOne({email : email})

            if(user && await bcrypt.compare(password , user.password)){

                let token = jwt.sign({_id : user._id , email : user.email} , process.env.SECRET)
                res.send({token : token , firstName : user.firstName})
            }else{
                res.status(405).send({message : 'Invalid credentials'})
            }
        }catch(err){
            res.status(444).send(err)
        }
    }else{
        res.status(405).send({message : 'Missing required params'})
    }
}

/* 
body : email
*/
exports.forgotPassword = async(req , res)=>{
    let {email} = req.body
    if(email){
        try{
            let user = await UserModel.findOne({email : email})
            if(user){
                user.resetCode = uuid.v4()
                let expiration = new Date();
                expiration.setHours(expiration.getHours() + 2)
                user.resetTimeout = expiration
                await user.save()
                //send mail
                let mailContent ={
                    from : 'NODE APP',
                    to : user.email,
                    subject : 'Reset Password',
                    text : '<a>test ',
                    html : `reset code : <a href="http://localhost:3000/reset/${user.resetCode}">
                    click here </a>`

                }
                await transporter.sendMail(mailContent)

                res.send({message : 'Mail sent successfully'})

            }else{
                res.status(405).send({message : 'Invalid Credentials'})
            }

        }catch(err){
            console.log(err)
            res.status(405).send(err)
        }
    }else{
        res.status(405).send({message : 'Missing required params'})
    }
}


exports.resetPassword = async(req, res)=>{
    let {resetCode  , newPassword} = req.body
    if(resetCode && newPassword){
        try{
            let user = await UserModel.findOne({resetCode : resetCode})
            if(user && new Date() < new Date(user.resetTimeout)){
                    let key = await bcrypt.genSalt(10)
                    user.password = await bcrypt.hash(newPassword , key)
                    user.resetCode = null
                    user.resetTimeout = null
                    await user.save()
                    res.send({message : 'Password updated !'})
            } else{
                res.status(405).send({message : 'Reset link expired'}) 
            }           
        }catch(err){
            res.status(405).send(err) 
        }

    }else{
        res.status(405).send({message : 'Missing required params'}) 
    }
}

