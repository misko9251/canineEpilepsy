const express = require('express');
const passport = require('passport');
const config = require('../config/config');
const router = express.Router();
const Pet = require('../models/Pet');
const homeController = require('../controllers/home');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', ensureGuest, homeController.getHomePage);
router.get('/login', ensureGuest, homeController.getLoginPage);

router.post('/loginLocal', 
  passport.authenticate('local', { failureRedirect: '/' }),
  async function(req, res) {
    // Successful authentication, redirect based on whether survey was filled out.
    const pet = await Pet.find({userId: req.user.userId})
    if(pet.length >= 1){
      res.redirect('/petProfile')
    }else{
      res.redirect('/petEntry');
    }
  });

module.exports = router;