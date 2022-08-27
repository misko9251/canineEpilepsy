const express = require('express');
const passport = require('passport');
const config = require('../config/config');
const router = express.Router();
const Pet = require('../models/Pet');
const homeController = require('../controllers/home');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', homeController.getHomePage);

router.post('/loginLocal', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/petEntry',
      failureRedirect: '/',
      failureFlash: true
    })(req, res, next);
  });
module.exports = router;