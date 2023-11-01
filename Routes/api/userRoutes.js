const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// API routes for users
router.get('/api/users', userController.getAllUsers);
router.get('/api/users/:userId', userController.getUserById);
router.post('/api/users', userController.createUser);
router.put('/api/users/:userId', userController.updateUser);
router.delete('/api/users/:userId', userController.deleteUser);
router.post('/api/users/:userId/friends/:friendId', userController.addFriend);
router.delete('/api/users/:userId/friends/:friendId', userController.removeFriend);

module.exports = router;
