const express=require('express')
const app=express()
const port=5000
const mongoose=require('mongoose')
const cookieParser = require("cookie-parser");
const {mongoURI}=require('./config/key')
const {Problem}=require('./models/Problem')
const {User}=require('./models/User')
const bodyParser = require('body-parser');
const path=require('path')
require('dotenv').config({ path: path.join(__dirname, './.env') })

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
mongoose.connect(mongoURI,{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false})


//local passport test
// const session = require('express-session'); // 세션 설정
// const passport = require('./func/passport'); 
// app.use(session({ secret: '비밀코드',cookie:{maxAge:60*1000}, resave: true, saveUninitialized: false })); // 세션 활성화
// app.use(passport.initialize()); // passport 구동
// app.use(passport.session()); // 세션 연결


// app.get('/login', passport.authenticate('google', { scope:['profile']}));

// app.get('/login/callback',
//   passport.authenticate('google'),(req,res)=>{
//       console.log(req.user._json)
//   });

//////---------------------------------

app.get('/',(req,res)=>{
    console.log(req.body);
    res.json({messsage:"hellow"})

})
app.get('/temp',(req,res)=>{
    console.log('recieve');
    console.log(req.cookies);
    
    res.json({messsage:"hellow"})

})
app.use('/data',require('./routes/data'))
app.use('/problem',require('./routes/problem'))
app.use('/user',require('./routes/user'))
app.listen(port,()=>{
    console.log('listening..',port);
})