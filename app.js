//1. importations
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
//2. initialisations
const server = express()
//Activer JSON dans les requetes
server.use(express.json())

mongoose.connect(process.env.DB)
.then(()=> console.log('Mongodb connected'))
.catch((err)=>console.log(err))

//3.traitements

server.get('/' , (req , res)=>{
    res.send({message : 'Hello'})
})
require('./routes')(server)

//4.lancement du serveur
server.listen(3000)

