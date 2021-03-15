const express=require('express')
const app=express()
const port=5000
const mongoose=require('mongoose')
const cookieParser = require("cookie-parser");
const {mongoURI}=require('./config/key')
const {Problem}=require('./models/Problem')
const {User}=require('./models/User')
const {auth}=require('./middleware/auth')
const bodyParser = require('body-parser');
const path=require('path')
require('dotenv').config({ path: path.join(__dirname, './.env') })

app.use((req,res,next)=>{
    let whitelist=[
        'http://localhost:3000',
        'http://algohelper.ga',
    ]
    let origin = req.headers.origin;
    if (whitelist.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Credentials", true);

    next()
})
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
mongoose.connect(mongoURI,{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false})



app.get('/',(req,res)=>{
    console.log(req.body);
    res.cookie('test','asdasd',{
        httpOnly:true,
        domain:'algohelper.ga'

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
app.use('/data',require('./routes/data'))
app.use('/problem',require('./routes/problem'))
app.use('/user',require('./routes/user'))
app.listen(port,()=>{
    console.log('listening..',port);
})