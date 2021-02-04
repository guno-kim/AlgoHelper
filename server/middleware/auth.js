const jwt=require('jsonwebtoken')
const {User}=require('../models/User')
let auth=async (req,res,next)=>{
    try {
        const token=req.cookies.logintoken;
        let decoded=await jwt.verify(token,process.env.JWT_SECRET_KEY)
        let user=await User.findOne({_id:decoded})
        req.auth=true
        req.user=user
        next()
    } catch (error) {
        console.log(error)
        req.auth=false
        req.error=error
        next()
    }
  
}

module.exports={auth}