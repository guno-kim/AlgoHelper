const passport = require('passport');
const GoogleStarategy = require('passport-google-oauth20').Strategy;



  passport.use(new GoogleStarategy({ // local 전략을 세움
    clientID: process.env.GoogleClientID,
    clientSecret:process.env.GoogleClientSecret,
    callbackURL:"/user/login/callback"
  },  
  function(accessToken, refreshToken, profile, cb) {
    console.log('profile: ', profile)
    return cb(null, profile);
  }))

  passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    console.log('serialize!!!')
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    console.log('deserialize!!!')
    done(null, user); // 여기의 user가 req.user가 됨
  });

module.exports = passport;

