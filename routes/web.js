
const homeController=require('../app/http/controller/homeController.js')
const authController=require('../app/http/controller/authController.js')
const cartController=require('../app/http/controller/customers/cartController.js')


function initRoutes(app){
    
    app.get('/', homeController().index)
    
    app.get('/cart',cartController().index)
    
    app.get('/login',authController().login)
    
    app.get('/register',authController().register)

    app.post('/update-cart',cartController().update)
    
}

module.exports=initRoutes;