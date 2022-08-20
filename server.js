const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const homeRouter = require('./routes/home');
const petRouter = require('./routes/pet');
const petProfileRouter = require('./routes/petProfile');
const logRouter = require('./routes/log')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');
app.locals.moment = require('moment');

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
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl:process.env.MONGO_URI})
  }))

// Set Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', homeRouter);
app.use('/petEntry', petRouter);
app.use('/petProfile', petProfileRouter);
app.use('/log', logRouter);
app.use('/auth', require('./routes/auth'));



app.listen(process.env.PORT || 3000, () =>{
    console.log(`Listening on Port ${process.env.PORT}`)
})