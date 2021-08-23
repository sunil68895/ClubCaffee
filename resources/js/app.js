import axios from 'axios'
import Noty from 'notie'
import initAdmin from './admin'


let addTocart= document.querySelectorAll('.add-to-cart')
let cartCounter=document.querySelector('#cartCounter')


function updateCart(item){
    axios.post('/update-cart',item)
    .then(res=>{
        console.log(res)
        cartCounter.innerHTML= res.data.totalQty
        Noty.alert({
            text:'Item added to cart',
        })
    }).catch((err)=>{
        Noty.alert({
            text:'Something went wrong',
        })
    })
}




addTocart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        console.log(e)
        let item=JSON.parse(btn.dataset.item)
        updateCart(item)
        console.log(item)
    })
})

const alertMsg= document.querySelector('#success-alert')
if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove()
    },2000)
}

initAdmin()