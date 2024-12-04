const express = require('express');
const { registerProfile, matchProfiles } = require('../controllers/profileController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// router.post('/register', registerProfile);

// if we want to add middleware authentication for registration
router.post('/register', authenticate, registerProfile); 

router.get('/match', authenticate, matchProfiles);

module.exports = router;
