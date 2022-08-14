const Pet = require('../models/Pet')

module.exports = {
    getPetPage: async (req, res) =>{
        try {
            const pet = await Pet.find({userId: req.user.userId});
            res.render('petEntry.ejs', {myPet: pet, user: req.user});
        } catch (error) {
            console.log(error)
        }
    },
    addPetInfo: async (req, res) =>{
        try {
            await Pet.create({name: req.body.dogName, breed: req.body.dogBreed, birthday: req.body.dogBirthday, gender: req.body.dogGender, spayed: req.body.dogSpay, userId: req.user.userId});
            res.redirect('/petProfile')
        } catch (error) {
            console.log(error)
        }
    }
}

// name, breed, birthday, gender, spayed