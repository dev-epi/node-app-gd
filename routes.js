const productCtrl = require('./controllers/products.controller')
const userController = require('./controllers/users.controller')
const experienceController = require('./controllers/experiences.controller')
const skillsController = require('./controllers/skills.controller')
const multipart = require('connect-multiparty')
const uploadMiddleware = multipart({uploadDir : './uploads'})

const authController = require('./controllers/auth.controller')
const { authMiddleware } = require('./middlewares/auth')
module.exports = (server)=>{

    server.get('/products' , productCtrl.getProducts)
    server.get('/products/:marque' , productCtrl.getProductsByMarque)
    server.post('/create_product' , productCtrl.addProduct)
    server.put('/update_product/:id' ,productCtrl.editProduct )
    server.delete('/remove_product/:id' ,productCtrl.deleteProduct)


    server.get('/users' , userController.getAll)
    server.post('/create_user',uploadMiddleware , userController.create)
    server.put('/users/:id', [authMiddleware, uploadMiddleware] , userController.update)
    server.delete('/users/:id' , userController.remove)


    server.get('/experiences' , authMiddleware , experienceController.getAll)
    server.post('/experiences', authMiddleware , experienceController.create)
    server.put('/experiences/:id' ,authMiddleware, experienceController.update)
    server.delete('/experiences/:id',authMiddleware , experienceController.remove)

    server.get('/skills' , skillsController.getAll)
    server.post('/skills' , skillsController.create)
    server.put('/skills/:id' , skillsController.update)
    server.delete('/skills/:id' , skillsController.remove)

    server.post('/auth/register' , authController.register)
    server.post('/auth/login' , authController.login)

}