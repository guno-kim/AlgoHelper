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
    const token=jwt.sign(userInfo,process.env.JWT_SECRET_KEY,{
      expiresIn: 60
  })
    return {token,name:user.name}
  }catch(err){
    console.log(err)
    return {err}
  }


};


const User=mongoose.model('Users', userSchema)

module.exports ={User}