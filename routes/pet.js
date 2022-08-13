const express = require('express');
const router = express.Router();
const petController = require('../controllers/pet');

router.get('/', petController.getPetPage);

module.exports = router;