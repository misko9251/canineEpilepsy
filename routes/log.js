const express = require('express');
const router = express.Router();
const logController = require('../controllers/log')

router.get('/', logController.loadPage);
router.post('/postLog', logController.addPost);

module.exports = router