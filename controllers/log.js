const Seizure = require('../models/Seizures')

module.exports = {
    loadPage: async (req, res) => {
        try {
            const posts = await Seizure.find({userId: req.user.userId})
            res.render('log.ejs', {myPosts: posts, user: req.user})
            console.log(posts)
        } catch (error) {
            
        }
    },
    addPost: async (req, res) => {
        try {
            await Seizure.create({date: req.body.seizureDate, time: req.body.seizureTime, length: req.body.seizureLength, observation: req.body.seizureObservations, person: req.body.seizureObservor, userId: req.user.userId})
            res.redirect('/log')
        } catch (error) {
            console.log(error)
        }
    }
}