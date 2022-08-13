const express = require('express');
const passport = require('passport');
const router = express.Router();

// Auth with Google with a GET request
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// Google auth callback

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/petProfile');
  });

module.exports = router;