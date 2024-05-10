const express = require('express');

const router = express.Router();


const { test, registerUser, loginUser, getProfile, logoutUser } = require('../controllers/authController');



router.post('/signup', registerUser)
router.post('/signin', loginUser)
router.get('/profile', getProfile)
router.get('/logout', logoutUser)



module.exports = router;
