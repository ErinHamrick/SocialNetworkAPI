const express = require('express');
const router = express.Router();

// API routes for users
const {
      getAllUsers,
      getUserById,
      createUser,
      updateUser,
      deleteUser,
      addFriend,
      removeFriend
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getUserById).delete(deleteUser).put(updateUser);

router.route('/:userId/friends/:friendId').delete(removeFriend).post(addFriend);
 
module.exports = router;
