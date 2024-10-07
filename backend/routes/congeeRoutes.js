const express = require('express');
const router = express.Router();

const {
  createCongee,
  getCongees,
  updateCongee,
  deleteCongee,
  getCongeeById,
} = require('../controllers/congeeController');


router.route('/').post( createCongee).get(getCongees);

router
  .route('/:id')
  .get(getCongeeById)
  .patch(updateCongee)
  .delete(deleteCongee);

module.exports = router;
