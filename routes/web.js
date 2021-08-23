
const homeController=require('../app/http/controller/homeController.js')
const authController=require('../app/http/controller/authController.js')
const cartController=require('../app/http/controller/customers/cartController.js')
const orderController=require('../app/http/controller/customers/orderController.js')
const adminOrderController=require('../app/http/controller/admin/orderController')
const guest= require('../app/http/middlewares/guest')
const auth= require('../app/http/middlewares/auth')
const admin= require('../app/http/middlewares/admin')

function initRoutes(app){
    
   
    
    app.get('/cart',cartController().index)
    
    app.get('/login',guest,authController().login)

    app.post('/login',authController().postLogin)
    
    app.get('/register',guest,authController().register)

    app.post('/register', authController().postRegister)

    app.post('/logout', authController().logout)

    app.post('/update-cart',cartController().update) 

   

// Customer routes
    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)

// Admin routes
    app.get('/admin/orders', admin, adminOrderController().index)

    app.get('/', homeController().index)


    
}

module.exports=initRoutes;