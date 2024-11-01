const productCtrl = require('./controllers/products.controller')
const userController = require('./controllers/users.controller')
module.exports = (server)=>{

    server.get('/products' , productCtrl.getProducts)
    server.get('/products/:marque' , productCtrl.getProductsByMarque)
    server.post('/create_product' , productCtrl.addProduct)
    server.put('/update_product/:id' ,productCtrl.editProduct )
    server.delete('/remove_product/:id' ,productCtrl.deleteProduct)


    server.get('/users' , userController.getAll)
    server.post('/create_user' , userController.create)

}