import axios from 'axios'
import moment from 'moment'
import Noty from 'notie'
import initAdmin from './admin'


let addTocart= document.querySelectorAll('.add-to-cart')
let cartCounter=document.querySelector('#cartCounter')


function updateCart(item){
    axios.post('/update-cart',item)
    .then(res=>{
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



// Change order status
let statuses=document.querySelectorAll('.status_line')
let hiddenInput=document.querySelector('#hiddenInput')
let order=hiddenInput ? hiddenInput.value:null
order=JSON.parse(order)
let time=document.createElement('small')


function updateStatus(order){
    statuses.forEach((status)=>{
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true
    statuses.forEach((status)=>{
        let dataProp=status.dataset.status
        if(stepCompleted){
            status.classList.add('step-completed')
        }
        if(dataProp==order.status){
            stepCompleted=false
            time.innerHTML=moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            if(status.nextElementSibling)
            status.nextElementSibling.classList.add('current')
        }
    })
}

updateStatus(order)

//Socket
let socket= io()
initAdmin(socket)

// Join
if(order){
    socket.emit('join',`order_${order._id}`)
}

let adminAreaPath= window.location.pathname
if(adminAreaPath.includes('admin')){
    socket.emit('join', 'adminRoom')
}


socket.on('orderUpdated',(data)=>{
    const updatedOrder={...order}
    updatedOrder.updatedAt=moment().format()
    updatedOrder.status=data.status
    updateStatus(updatedOrder)
    Noty.alert({
        text:'Order status updated',
    })
})