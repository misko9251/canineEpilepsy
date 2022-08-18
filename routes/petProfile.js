const express = require('express');
const router = express.Router();
const petProfileRouter = require('../controllers/petProfile')
const {ensureAuth, ensureGuest} = require('../middleware/auth')

router.get('/', ensureAuth, petProfileRouter.getProfilePage);
router.get('/sortOldest', petProfileRouter.sortOldest);
router.post('/addPost', petProfileRouter.addPost);
router.delete('/deletePost', petProfileRouter.deletePost);

module.exports = router;