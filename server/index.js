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

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
mongoose.connect(mongoURI,{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false})



app.get('/',(req,res)=>{
    console.log(req.body);
    res.json({messsage:"hellow"})

})
app.get('/temp',auth,(req,res)=>{
    if(req.auth){
        
    }

})
app.use('/data',require('./routes/data'))
app.use('/problem',require('./routes/problem'))
app.use('/user',require('./routes/user'))
app.listen(port,()=>{
    console.log('listening..',port);
})