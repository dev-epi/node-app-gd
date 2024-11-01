const products = require("../products")

exports.getProducts = (req , res)=>{
    res.send(products)
}


exports.getProductsByMarque =  (req , res)=>{
    let m = req.params.marque
    let result = products.filter(p=>p.marque.toLowerCase() == m.toLowerCase())
    res.send(result)
}

exports.addProduct = (req , res)=>{
    console.log('post api')
    res.send(req.body)
}

exports.editProduct = (req , res)=>{
    let product = products.find(p=>p.id == req.params.id)
    if(!product){
        res.status(430).send('Product Not Found')
    }else{
        //query
        res.send({message : 'Product updated successfully'})
    }
}

exports.deleteProduct = (req , res)=>{
    let productIndex = products.findIndex(p=>p.id == req.params.id)
    if(productIndex == -1){
        res.status(430).send('Nothing to delete')
    }else{

        products.splice(productIndex , 1)
        res.send({message : 'Product deleted successfully'})

    }
}