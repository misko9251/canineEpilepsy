const express = require('express');
const router = express.Router();
const logController = require('../controllers/log');
const {ensureAuth, ensureGuest} = require('../middleware/auth');

router.get('/', ensureAuth, logController.loadPage);
router.post('/postLog', logController.addPost);
router.delete('/deletePost', logController.deleteLog)

module.exports = router