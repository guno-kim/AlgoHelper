const jwt=require('jsonwebtoken')
const {User}=require('../models/User')
let auth=async (req,res,next)=>{
    try {
        const token=req.cookies.logintoken;
        if(!token){
            console.log('no token!!!!')
            res.end()
        }else{
            let user=await User.findByToken(token)
            req.auth=true
            req.user=user
            next()
        }
    } catch (error) {
        console.log(error)
        req.auth=false
        req.error=error
        next()
    }
  
}

module.exports={auth}