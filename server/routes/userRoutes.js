const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require("../middleware/jwtMiddleware")

// Define the POST route for user registration
router.post('/register', userController.registerUser );
router.get('/AllUsers',authenticateToken , userController.getAllUsers );
router.post('/login', userController.loginUser );
module.exports = router;