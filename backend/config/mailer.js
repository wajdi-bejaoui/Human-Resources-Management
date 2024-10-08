const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure you load .env file

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // or another email service
  auth: {
    user: process.env.EMAIL_USER, // load email from .env
    pass: process.env.EMAIL_PASS, // load password from .env
  },
});

module.exports = transporter;
