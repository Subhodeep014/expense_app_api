const express = require('express');

const router = express.Router();

const cors = require('cors');
const { test, registerUser, loginUser, getProfile, logoutUser } = require('../controllers/authController');

router.use(
    cors({
        credentials: true,
        origin : 'http://localhost:5173'
    })
)

router.post('/signup', registerUser)
router.post('/signin', loginUser)
router.get('/profile', getProfile)
router.get('/logout', logoutUser)



module.exports = router;