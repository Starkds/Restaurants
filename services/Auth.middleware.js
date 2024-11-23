const passport = require("passport");
const User = require('../models/user.model.js');
const LocalStrategy = require("passport-local").Strategy;


 const PASSPORT = passport.use(
    new LocalStrategy(async function (USERNAME, PASSWORD, done) {
      console.log(`Recieved Credentials:`, USERNAME, PASSWORD);
  
      try {
        const user = await User.findOne({ username: USERNAME });
        if (!user) {
          return done(null, false, { message: "incorrect UserName" });
        }
        const ispasswordMatch = await user.ComparePassword(PASSWORD);
  
        if (!ispasswordMatch) {
          return done(null, false, { message: "incorrect password" });
        } else {
          return done(null, user);
        }
      } catch (error) {
        return done(error); 
      }
    })
  );


  module.exports = PASSPORT;