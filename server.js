require('dotenv').config()
const express = require('express')
const app=express()
const ejs=require('ejs')
const path=require('path')
const passsport= require('passport')
const expressLayout=require('express-ejs-layouts')
const mongoose=require('mongoose')
const session=require('express-session')
const flash=require('express-flash')
const MongoDbStore=new require('connect-mongodb-session')(session) 
const Emitter=require('events')

const PORT = process.env.PORT || 3000

const url='mongodb+srv://root:sunil68896@cluster0.focoz.mongodb.net/pizza?retryWrites=true&w=majority'

// Database connection
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});


//session store

let mongoStore=new MongoDbStore({
    uri:'mongodb+srv://root:sunil68896@cluster0.focoz.mongodb.net/pizza?retryWrites=true&w=majority',
    collection: 'sessions'
})

//Event emitter

const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)


//session config

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store:mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))

//passport config
const passportInit= require('./app/config/passport')
passportInit(passsport)

app.use(passsport.initialize())
app.use(passsport.session())

app.use(flash())

//Assets
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Global middleware

app.use((req,res,next)=>{
    res.locals.session=req.session
    res.locals.user=req.user
    next()
})

//set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

require('./routes/web')(app);




const server=app.listen( PORT , ()=>{
    console.log(`listening on port ${PORT}`)
})



//Socket

const io=require('socket.io')(server)
io.on('connection',(socket)=>{
    // Join
    socket.on('join',(roomName)=>{
        socket.join(roomName)
    })
})

eventEmitter.on('orderUpdated',(data)=>{
    io.to(`order_${data.id}`).emit('orderUpdated',data)
})

eventEmitter.on('orderPlaced',(data)=>{
    io.to(`adminRoom`).emit('orderPlaced',data)
})