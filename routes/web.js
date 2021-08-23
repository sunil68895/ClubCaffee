
const homeController=require('../app/http/controller/homeController.js')
const authController=require('../app/http/controller/authController.js')
const cartController=require('../app/http/controller/customers/cartController.js')
const guest= require('../app/http/middlewares/guest')

function initRoutes(app){
    
    app.get('/', homeController().index)
    
    app.get('/cart',cartController().index)
    
    app.get('/login',guest,authController().login)

    app.post('/login',authController().postLogin)
    
    app.get('/register',guest,authController().register)

    app.post('/register', authController().postRegister)

    app.post('/logout', authController().logout)

    app.post('/update-cart',cartController().update)


    
}

module.exports=initRoutes;