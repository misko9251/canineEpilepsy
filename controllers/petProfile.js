const Pet = require('../models/Pet')

module.exports = {
    getProfilePage: async (req, res) =>{
        try {
            const pet = await Pet.find({userId: req.user.userId})
            res.render('petProfile.ejs', {myPet: pet, user: req.user})
        } catch (error) {
            console.log(error)
        }
    }
}