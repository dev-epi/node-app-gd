const productCtrl = require('./controllers/products.controller')
const userController = require('./controllers/users.controller')
const experienceController = require('./controllers/experiences.controller')
module.exports = (server)=>{

    server.get('/products' , productCtrl.getProducts)
    server.get('/products/:marque' , productCtrl.getProductsByMarque)
    server.post('/create_product' , productCtrl.addProduct)
    server.put('/update_product/:id' ,productCtrl.editProduct )
    server.delete('/remove_product/:id' ,productCtrl.deleteProduct)


    server.get('/users' , userController.getAll)
    server.post('/create_user' , userController.create)
    server.put('/users/:id' , userController.update)
    server.delete('/users/:id' , userController.remove)


    server.get('/experiences' , experienceController.getAll)
    server.post('/experiences' , experienceController.create)
    server.put('/experiences/:id' , experienceController.update)
    server.delete('/experiences/:id' , experienceController.remove)

}