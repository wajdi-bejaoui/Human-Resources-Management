const express = require('express');
const router = express.Router();

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
} = require('../controllers/userController');


router.route('/').post( createUser).get(getUsers);

router
  .route('/:id')
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
