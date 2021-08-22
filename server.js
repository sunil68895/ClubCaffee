require('dotenv').config()
const express = require('express')
const app=express()
const ejs=require('ejs')
const path=require('path')
const expressLayout=require('express-ejs-layouts')
const mongoose=require('mongoose')
const session=require('express-session')
const flash=require('express-flash')
const MongoDbStore=new require('connect-mongodb-session')(session) 

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


//session config

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store:mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))

app.use(flash())

//Assets
app.use(express.static('public'))
app.use(express.json())

//Global middleware

app.use((req,res,next)=>{
    res.locals.session=req.session
    next()
})

//set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

require('./routes/web')(app);




app.listen( PORT , ()=>{
    console.log(`listening on port ${PORT}`)
})