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
        // console.log(jwt_payload)
        // Here you could fetch the user from the database using the payload's ID
        const user = await User.findByPk(jwt_payload.id);

        if (user.role !== 'rh') {
          return res.status(StatusCodes.FORBIDDEN).json({ message: 'Unauthorized' });
        }
        
        // If user exists, pass it to Passport
        if (user) {
          // console.log(user)
          return done(null, user);
        }

        console.log("dont exist")

        // If user doesn't exist, return false
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
