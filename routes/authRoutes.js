const express = require('express');

const router = express.Router();

const cors = require('cors');
const { test, registerUser, loginUser, getProfile, logoutUser } = require('../controllers/authController');



router.post('/api/signup', registerUser)
router.post('/api/signin', loginUser)
router.get('/api/profile', getProfile)
router.get('/api/logout', logoutUser)



module.exports = router;
