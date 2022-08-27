const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
    registerPage: async (req, res) => {
        res.render('register.ejs')
    },
    registerUser: async(req, res) => {
        const { name, email, password, password2 } = req.body;
        let errors = [];

        // Check fields
        if(!name || !email || !password || !password2){
            errors.push({msg: 'Please fill in all fields.'})
        }

        // Check passwords match
        if(password !== password2){
            errors.push({msg: 'Passwords must match.'})
        }

        // Check pw length
        if(password.length < 8) {
            errors.push({msg: 'Password must be at least 8 characters.'})
        }

        if(errors.length > 0){
            res.render('register.ejs', {
                errors,
                name,
                email,
                password,
                password2
            })
        }else{
            // Validation passes all tests
            const exists = await User.findOne({userId: email})
            if(exists){
                errors.push({msg: 'This Email is already taken.'})
                res.render('register.ejs', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser =  new User({
                    userId: email,
                    displayName: name,
                    password,
                    email
                });
                // Hash Password
                bcrypt.genSalt(10, (err, salt)=> 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        // This sets the password ot hashed
                        newUser.password = hash;
                        // Save user
                        newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'You are now registered, please login!');
                            res.redirect('/login')
                        })
                        .catch(err => console.log(err))
                }))
            }
        }
    }
}