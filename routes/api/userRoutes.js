const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  removeFriend,
  addFriend
} = require('../../controllers/userControllers');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
    .route('/:userId')
    .get(getSingleUser)
    .delete(deleteUser)
    .put(updateUser);


// /api/students/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .delete(removeFriend)
    .post(addFriend);


module.exports = router;
