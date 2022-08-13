const express = require('express');
const router = express.Router();
const petController = require('../controllers/pet');
// const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', petController.getPetPage);

module.exports = router;