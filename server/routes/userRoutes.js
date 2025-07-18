const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getAllUsers,
    getMe
} = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/auth');

// POST new user registration
router.post('/register', registerUser);

// POST user login
router.post('/login', loginUser);

// Protected user route
router.get('/me', protect, getMe);

// Protected admin route
router.get('/', protect, adminOnly, getAllUsers);

module.exports = router;