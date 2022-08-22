const express = require('express');
const passport = require('passport');
const config = require('../config/config');
const router = express.Router();
const Pet = require('../models/Pet');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// Auth with Google with a GET request
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// Auth with Microsoft with a GET request
router.get('/login',
  function(req, res, next) {
    passport.authenticate('azuread-openidconnect', 
      { 
        response: res,                      
        resourceURL: config.resourceURL,    
        customState: 'my_state',            
        failureRedirect: '/' 
      }
    )(req, res, next);
  },
  function(req, res) {
    console.log('Login was called in the Sample');
    res.redirect('/petEntry');
});

// Microsoft Reply URL
router.get('/openid/return',
  function(req, res, next) {
    passport.authenticate('azuread-openidconnect', 
      { 
        response: res,    
        failureRedirect: '/'  
      }
    )(req, res, next);
  },
  function(req, res) {
    console.log('We received a return from AzureAD.');
    res.redirect('/petEntry');
  });

router.post('/openid/return',
  function(req, res, next) {
    passport.authenticate('azuread-openidconnect', 
      { 
        response: res,    
        failureRedirect: '/'  
      }
    )(req, res, next);
  },
  function(req, res) {
    console.log('We received a return from AzureAD.');
    res.redirect('/petEntry');
  });


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

// Google log out user
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

module.exports = router;