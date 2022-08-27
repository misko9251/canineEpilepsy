const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register');

router.get('/', registerController.registerPage);
router.post('/registerUser', registerController.registerUser);

module.exports = router;