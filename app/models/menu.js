const mongoose=require('mongoose')
const Schema=mongoose.Schema

const menuSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    size:{
        type:String,
        required:true,
        trm:true
    }
    ,
    calories:{
        type:Number,
        default:0
    },
})

module.exports=mongoose.model('menu',menuSchema)
