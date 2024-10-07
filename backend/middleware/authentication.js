// const jwt = require('jsonwebtoken');
// const StatusCodes = require('http-status-codes')
const passport = require('passport');
require('../config/passport')(passport); // Initialize Passport configuration



const authenticateUser = passport.authenticate('jwt', { session: false });


module.exports = {
  authenticateUser,
};


// const isTokenValid = ( token ) => jwt.verify(token, process.env.JWT_SECRET);

// const authenticateUser = async (req, res, next) => {
  //   let token;
  //   // check header
  //   const authHeader = req.headers.authorization;
//   if (authHeader && authHeader.startsWith('Bearer')) {
//     token = authHeader.split(' ')[1];
//   }


//   if (!token) {
//     // throw new CustomError.UnauthenticatedError('Authentication invalid');
//     return res.json({msg:"Authentication invalid"}).status(StatusCodes.UNAUTHORIZED);
//   }


//   try {
//     const payload = await isTokenValid(token);
//     req.user = {
//       id: payload.id,
//       role: payload.role
//     };
//     next();
//   } catch (error) {
//     // throw new CustomError.UnauthenticatedError('Authentication invalid');
//     return res.json({error});
//   }
// };