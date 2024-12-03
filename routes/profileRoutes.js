const express = require('express');
const { registerProfile, matchProfiles } = require('../controllers/profileController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerProfile);
router.get('/match', authenticate, matchProfiles);

module.exports = router;
