const express = require('express');
const router = express.Router();

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
  getUsersByRole,

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

module.exports = router;
