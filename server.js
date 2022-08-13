const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const homeRouter = require('./routes/home');
const petRouter = require('./routes/pet');
const connectDB = require('./config/db');

require('dotenv').config({path: './config/.env'});

// Passport
require('./config/passport')(passport);

connectDB()

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }))

// Set Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', homeRouter);
app.use('/petProfile', petRouter);
app.use('/auth', require('./routes/auth'));


app.listen(process.env.PORT || 3000, () =>{
    console.log(`Listening on Port ${process.env.PORT}`)
})