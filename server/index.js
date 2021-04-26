const express=require('express')
const app=express()
const port=5000
const mongoose=require('mongoose')
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const path=require('path')
require('dotenv').config({ path: path.join(__dirname, './.env') })

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', process.env.ClientDomain);
    res.setHeader('Access-Control-Allow-Headers','content-type')
    res.header("Access-Control-Allow-Credentials", true);
    next()
})
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect(process.env.MongoURI,{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false})

app.get('/',(req,res)=>{
    res.cookie('test','asdasd',{
        httpOnly:true,
        //domain:'algohelper.ga'
        domain:process.env.MainDomain
    })
    res.json({messsage:"hellow"})

})
app.get('/temp',(req,res)=>{
    console.log('temp')
    res.writeHead(302,{
        'Location':'http://localhost:3000/problem'
    })
    res.end()
})
app.use('/input',require('./routes/input'))
app.use('/problem',require('./routes/problem'))
app.use('/user',require('./routes/user'))
app.listen(port,()=>{
    console.log('listening..',port);
})