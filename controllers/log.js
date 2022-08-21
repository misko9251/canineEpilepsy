const Seizure = require('../models/Seizures');
const Pet = require('../models/Pet');

module.exports = {
    loadPage: async (req, res) => {
        try {
            const posts = await Seizure.find({userId: req.user.userId});
            const pet = await Pet.find({userId: req.user.userId});
            res.render('log.ejs', {myPosts: posts, user: req.user, myPet: pet});
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
    },
    deleteLog: async (req, res) => {
        try {
            await Seizure.findOneAndDelete({_id: req.body.postIdFromMongo})
            console.log('Log removed')
            res.json('OK')
        } catch (error) {
            console.log(error)
        }
    }
}