//1. importations
const express = require('express')
const products = require('./products')
const productCtrl = require('./controllers/products.controller')
//2. initialisations
const server = express()
//Activer JSON dans les requetes
server.use(express.json())
//3.traitements

server.get('/' , (req , res)=>{
    res.send({message : 'Hello'})
})
server.get('/products' , productCtrl.getProducts)
server.get('/products/:marque' , productCtrl.getProductsByMarque)

server.post('/create_product' , (req , res)=>{
    console.log('post api')
    res.send(req.body)
})

server.put('/update_product/:id' , (req , res)=>{
    let product = products.find(p=>p.id == req.params.id)
    if(!product){
        res.status(430).send('Product Not Found')
    }else{
        //query
        res.send({message : 'Product updated successfully'})
    }
})

server.delete('/remove_product/:id' , (req , res)=>{
    let productIndex = products.findIndex(p=>p.id == req.params.id)
    if(productIndex == -1){
        res.status(430).send('Nothing to delete')
    }else{

        products.splice(productIndex , 1)
        res.send({message : 'Product deleted successfully'})

    }
})

//4.lancement du serveur
server.listen(3000)

