const Pet = require('../models/Pet')
const Post = require('../models/Post');

module.exports = {
    getProfilePage: async (req, res) =>{
        try {
            const pet = await Pet.find({userId: req.user.userId});
            const posts = await Post.find({userId: req.userId}).sort({date: -1});
            res.render('petProfile.ejs', {myPet: pet, user: req.user, myPosts: posts})
        } catch (error) {
            console.log(error)
        }
    },
    addPost: async (req, res) =>{
        try {
            await Post.create({post: req.body.post})
            res.redirect('/petProfile')
        } catch (error) {
            console.log(error)
        }
    }
}