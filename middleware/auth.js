module.exports = {
    ensureAuth: function (req, res, next){
        if(req.isAuthenticated()){
            return next()
        }else{
            res.redirect('/')
        }
    },
    ensureGuest: function (req, res, next){
        if(!req.isAuthenticated()){
            return next()
        }else{
            res.redirect('/petProfile')
        }
    }
}

// ensureAuth will allow you to access pages that you need to be logged in to see, such as pet profile
// ensureGuest will make it so logged in users cannot view pages that logged out users should see, such as the login page
