const products = require("../products")

exports.getProducts = (req , res)=>{
    res.send(products)
}


exports.getProductsByMarque =  (req , res)=>{
    let m = req.params.marque
    let result = products.filter(p=>p.marque.toLowerCase() == m.toLowerCase())
    res.send(result)
}
