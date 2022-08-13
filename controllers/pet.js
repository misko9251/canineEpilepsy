const Pet = require('../models/Pet')

module.exports = {
    getPetPage: async (req, res) =>{
        res.render('petProfile.ejs');
    },
    addPetInfo: async (req, res) =>{
        try {
            await Pet.create({name: req.body.dogName, breed: req.body.dogBreed, birthday: req.body.dogBirthday, gender: req.body.dogGender, spayed: req.body.dogSpay, userId: req.user.id});
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }
}

// name, breed, birthday, gender, spayed