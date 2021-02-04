const express=require('express')
const router=express.Router();
const {User}=require('../models/User')
const session = require('express-session'); // 세션 설정
const jwt=require('jsonwebtoken')
const passport = require('../middleware/passport'); 
router.use(session({ secret: '비밀코드',cookie:{maxAge:10*60*1000}, resave: true, saveUninitialized: true,httpOnly: true })); // 세션 활성화
router.use(passport.initialize()); // passport 구동
router.use(passport.session()); // 세션 연결


router.get('/login', passport.authenticate('google', { scope:['profile']}));

router.get('/login/callback',
  passport.authenticate('google'),async (req,res)=>{
      console.log(req.user._json.sub)
      console.log(req.user._json.name)
      console.log(req.user.provider)
      const token=await User.handleLogin(req.user.provider,req.user._json.sub,req.user._json.name)//{token,name}
      res.cookie('logintoken',token,{
          httpOnly:true
      })
      //res.json({name:result.name})
      res.redirect('http://localhost:3000')
  });

  router.get('/auth',async (req,res)=>{
    try {
        const token=req.cookies.logintoken;
        let decoded=await jwt.verify(token,process.env.JWT_SECRET_KEY)
        let user=await User.findOne({_id:decoded})
        res.json({auth:true,user:user})
    } catch (error) {
        console.log(error)
        res.json({auth:false,error:error})
    }
  
})

module.exports=router
