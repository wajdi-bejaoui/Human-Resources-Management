
const express = require('express');
const multer = require('multer');
const path = require('path');
const upload = require('../config/multer')
const { addEmployee, updateEmployee, deleteEmployee, getEmployeeById } = require('../controllers/employeeController');
const {
  authenticateUser
} = require('../middleware/authentication');

const router = express.Router();



// POST route to handle form submissions
router.route('/')
      .post(authenticateUser, upload.single('image'), addEmployee)

router.route('/:id').patch(authenticateUser, upload.single('image'), updateEmployee)
                    .delete(authenticateUser, deleteEmployee)
                    .get(authenticateUser, getEmployeeById)


module.exports = router;
