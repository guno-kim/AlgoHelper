const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  password: String
});

userSchema.methods.comparePassword = function(inputPassword, cb) {
  if (inputPassword === this.password) {
    cb(null, true);
  } else {
    cb('error');
  }
};
const User=mongoose.model('users', userSchema)

module.exports ={User}