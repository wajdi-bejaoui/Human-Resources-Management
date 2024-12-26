



const express = require('express');
const multer = require('multer');
const path = require('path');
const upload = require('../config/multer')
const { getReportByUserId } = require('../controllers/reportController');
const {
  authenticateUser
} = require('../middleware/authentication');

const router = express.Router();





router.route('/:id').get(getReportByUserId)


module.exports = router;
