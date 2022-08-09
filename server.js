const express = require('express');
const app = express();
const homeRouter = require('./routes/home');

require('dotenv').config({path: './config/.env'});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', homeRouter);

app.listen(process.env.PORT, () =>{
    console.log(`Listening on Port ${process.env.PORT}`)
})