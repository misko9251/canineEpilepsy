module.exports = {
    getHomePage: async (req, res) =>{
        res.render('index.ejs');
    },
    getLoginPage: async (req, res) =>{
        res.render('login.ejs')
    }
}