const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

const {authRegisterController , authLoginController} = require('../controller/authController');


// Register Route
router.post('/register' , authRegisterController);

// Login Route
router.post('/login' , authLoginController);


module.exports = router;