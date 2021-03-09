const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  id:{
    type:String,
    required:true
  },
  provider:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  problems:{
    type:Array
  }
});
userSchema.statics.handleLogin = async function(provider,id,name) {
  try{
    const userInfo={provider,id}
    let user=await User.findOne(userInfo)
    console.log(user)
    if(!user){
      const newUser=new User({...userInfo,name})
      await newUser.save()
        .then(console.log('saved'))
    }
    user=await User.findOne(userInfo)
    console.log(user._id)
    const token=jwt.sign(user._id.toHexString(),process.env.JWT_SECRET_KEY)
    return token
  }catch(err){
    console.log(err)
    return ""
  }
};
userSchema.statics.findByToken=async (token)=>{
  let decoded=await jwt.verify(token,process.env.JWT_SECRET_KEY)
  let user=await User.findOne({_id:decoded})
  return user
}

const User=mongoose.model('Users', userSchema)

module.exports ={User}
