


const express = require('express');
const multer = require('multer');
const path = require('path');
const upload = require('../config/multer')
const { addEmployee } = require('../controllers/employeeController');
const {
  authenticateUser
} = require('../middleware/authentication');

const router = express.Router();



// POST route to handle form submissions
router.post('/',authenticateUser, upload.single('image'), addEmployee);

module.exports = router;
