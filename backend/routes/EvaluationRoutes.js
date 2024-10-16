const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication'); // Assuming you have this middleware

const {
  createEvaluation,
  getEvaluations,
  getEvaluationById,
  updateEvaluation,
  deleteEvaluation,
  getMyEvaluation
} = require('../controllers/EvaluationController');


router.route('/myEvaluation')
  .get(authenticateUser, getMyEvaluation);

router.route('/')
  .post(authenticateUser, createEvaluation)
  .get(authenticateUser, getEvaluations);

router.route('/:id')
  .get(authenticateUser, getEvaluationById)
  .patch(authenticateUser, updateEvaluation)
  .delete(authenticateUser, deleteEvaluation);

module.exports = router;
