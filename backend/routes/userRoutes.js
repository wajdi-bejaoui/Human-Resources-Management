const express = require('express');
const router = express.Router();

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
  getUsersByRole,
  createUserbyRH,

} = require('../controllers/userController');


router.route('/').post( createUser).get(getUsers);
 
router
  .route('/:role')
  .get(getUsersByRole);

router
  .route('/:id')
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);
// Route to create a user by RH
router.route('/create-by-rh')
  .post(createUserbyRH); // Create a user by RH 
  
module.exports = router;
