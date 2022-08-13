const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// Auth with Google with a GET request
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// Google auth callback

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/petProfile');
  });

// Log Out User

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

module.exports = router;