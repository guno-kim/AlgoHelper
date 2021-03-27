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
  passport.authenticate('google'),
  async (req,res)=>{
      console.log('callback')
      const token=await User.handleLogin(req.user.provider,req.user._json.sub,req.user._json.name)//{token,name}
      console.log('token generated : ',token)
      res.cookie('logintoken',token,{
        httpOnly:true,
        domain:process.env.MainDomain
      })
      res.redirect(`${process.env.ClientDomain}/user/profile`)
  });

router.get('/auth',async (req,res)=>{
    try {
        const token=req.cookies.logintoken;
        if(!token){
            res.json({auth:false})
        }
        else{
            let user=await User.findByToken(token)
            res.json({auth:true,data:user})
        }
    } catch (error) {
        console.log(error)
        res.json({auth:false,error:error})
    }
})

router.get('/logout',(req,res)=>{
    res.clearCookie('logintoken',{
        domain:process.env.MainDomain
    })
    res.json({success:true})
});

router.post('/profile/update',async (req,res)=>{
    try {
        const token=req.cookies.logintoken;
        const body=req.body
        let decoded=await jwt.verify(token,process.env.JWT_SECRET_KEY)
        let newUser=await User.findOneAndUpdate({_id:decoded},{$set:body},{new:true})
        res.json({auth:true,data:newUser})
        console.log(newUser)
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error})
    }
})

module.exports=router
