const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const {
  createHoraire,
  getHorairesByUser,
  confirmHoraire,
  rejectHoraire,
  getAllHoraires
} = require('../controllers/HoraireController');

// Route for employers to submit their working hours
router.route('/')
  .post(authenticateUser, createHoraire);

// Route to get all horaires for a specific user (e.g., an employer)
router.route('/user/:userId')
  .get(authenticateUser, getHorairesByUser);

// Route for RH to confirm the working hours of an employee
router.route('/confirm/:id')
  .patch(authenticateUser, confirmHoraire);

// Route for RH to reject the working hours of an employee
router.route('/reject/:id')
  .patch(authenticateUser, rejectHoraire);

// Route for RH to get all horaires
router.route('/')
  .get(authenticateUser, getAllHoraires);

module.exports = router;
