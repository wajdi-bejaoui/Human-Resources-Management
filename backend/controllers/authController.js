const User = require("../models/User");
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");
const express = require("express");
const session = require ("express-session");
const { StatusCodes } = require('http-status-codes');
// const { log } = require("util");
const path = require ("path");
const app = express();
const secretKey = process.env.JWT_SECRET;
// confi encodage data
app.use(
    session({
        secret: secretKey,
        resave: false,
        saveUninitialized: true
    })
);// Middleware to check and validate JWT

 const register =  async (req, res) => {
    
     try {
         // Check if the email already exists in the database
         const existingUser = await User.findOne({
            where: { email: req.body.email },
          });
      
          if (existingUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User already exists' });
          }
         // Create a new user with the hashed password
         const newUser = new User({
             email: req.body.email,
             password: req.body.password,
             fullname: req.body.fullname,
             role:'employee',
         });
 
         // Save the user to the database
         const user = await newUser.save();
        

         res.status(StatusCodes.CREATED).json({ message: 'Registered successfully', user });
    
     } catch (error) {
         console.error('Error during user registration:', error);
         res.status(500).json({ message: 'Internal server error' });
     }
 };
 

const login = async (req, res) => {
    let user = req.body;


    // Check if the email exists
    const existingUser = await User.findOne({
        where: { email: req.body.email },
      });
        // Email not found
        if (!existingUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please check your Email" });
        }
        // Compare passwords
        const isMatch = await bcrypt.compare(req.body.password, existingUser.password);
        console.log('Password Match:', isMatch);  // Log the result of password comparison

        // Passwords do not match
        if (!isMatch) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please check your Password" }).status(StatusCodes.UNAUTHORIZED);
        }

        let userToSend = {
            fullname: existingUser.fullname,
            id: existingUser.id,
            role: existingUser.role,
            email: existingUser.email,
        };
        const token = jwt.sign(userToSend, secretKey, { expiresIn: '48h' });
        
        res.status(StatusCodes.OK).json({ message: "Welcome", token: token });
}

module.exports = {
    register,
    login
  };
  