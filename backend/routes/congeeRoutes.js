const express = require('express');
const router = express.Router();

const fileUpload = require('../config/multer')


const {
  createCongee,
  getCongees,
  updateCongee,
  deleteCongee,
  getCongeeById,
  addMyCongee,
  getMyCongees,
  deleteMyCongee,
} = require('../controllers/congeeController');

const {
  authenticateUser
} = require('../middleware/authentication');


router.route('/').post( createCongee).get(getCongees);

router.route('/myCongee')
  .post(authenticateUser,fileUpload.single('file'),addMyCongee)
  .get(authenticateUser,getMyCongees)
  

  
router.route('/myCongee/:id').delete(authenticateUser,deleteMyCongee)


router
  .route('/:id')
  .get(getCongeeById)
  .patch(updateCongee)
  .delete(deleteCongee);

module.exports = router;
