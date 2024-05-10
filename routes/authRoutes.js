const express = require('express');

const router = express.Router();

const cors = require('cors');
const { test, registerUser, loginUser, getProfile, logoutUser } = require('../controllers/authController');

const corsOptions = {
  origin: 'https://expensereactapp.netlify.app', // Replace with your React app's URL
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true // Allow sending cookies across domains
}

// Apply the CORS middleware to all routes in your router
router.use(cors(corsOptions));

router.post('/api/signup', registerUser)
router.post('/api/signin', loginUser)
router.get('/api/profile', getProfile)
router.get('/api/logout', logoutUser)



module.exports = router;
