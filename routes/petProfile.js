const express = require('express');
const router = express.Router();
const petProfileRouter = require('../controllers/petProfile')
const {ensureAuth, ensureGuest} = require('../middleware/auth')

router.get('/', ensureAuth, petProfileRouter.getProfilePage);

module.exports = router;