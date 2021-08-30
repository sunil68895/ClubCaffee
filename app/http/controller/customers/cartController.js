function cartController(){
    return{
        index(req,res){
            res.render('customer/cart')
        },
        
        update(req,res){ 
    //for the first tym creating cart and adding object structure        
            if(!req.session.cart){
                req.session.cart={
                    items:{},
                    totalQty:0,
                    totalPrice:0,
                    totalCalories:0
                }
            }
            let cart=req.session.cart

            // Check if item does not exist in cart

            if(!cart.items[req.body._id]){
                cart.items[req.body._id]={
                    item:req.body,
                    qty:1
                }
                cart.totalQty=cart.totalQty+1
                cart.totalCalories=cart.totalCalories+req.body.calories
                cart.totalPrice=cart.totalPrice+req.body.price
            }else{
                cart.items[req.body._id].qty=cart.items[req.body._id].qty+1
                cart.totalQty=cart.totalQty+1
                cart.totalCalories=cart.totalCalories+req.body.calories
                cart.totalPrice=cart.totalPrice+req.body.price
            }


            return res.json({totalQty:cart.totalQty})
        },
        delete(req,res){
            delete req.session.cart
            return res.json({message:'cart deleted successfully'})
        }
    }
}

module.exports=cartController