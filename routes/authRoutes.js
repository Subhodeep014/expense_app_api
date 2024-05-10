const express = require('express');

const router = express.Router();

const cors = require('cors');
const { test, registerUser, loginUser, getProfile, logoutUser } = require('../controllers/authController');

router.use(
    cors({
        credentials: true,
        origin : 'https://expensereactapp.netlify.app/'
    })
)

router.post('/signup', registerUser)
router.post('/signin', loginUser)
router.get('/profile', getProfile)
router.get('/logout', logoutUser)



module.exports = router;
