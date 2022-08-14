const express = require('express');
const passport = require('passport');
const router = express.Router();
const Pet = require('../models/Pet');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// Auth with Google with a GET request
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// Google auth callback

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  async function(req, res) {
    // Successful authentication, redirect based on whether survey was filled out.
    const pet = await Pet.find({userId: req.user.userId})
    if(pet.length >= 1){
      res.redirect('/petProfile')
    }else{
      res.redirect('/petEntry');
    }
  });



// Log Out User

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

module.exports = router;