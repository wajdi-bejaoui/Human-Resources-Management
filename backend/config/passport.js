const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User'); // Import your user model if needed
const opts = {};

// Extract JWT from the Authorization header as a Bearer token
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

// Use the secret to verify the token
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        // Here you could fetch the user from the database using the payload's ID
        const user = await User.findById(jwt_payload.id);
        
        // If user exists, pass it to Passport
        if (user) {
          return done(null, user);
        }
        
        // If user doesn't exist, return false
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
