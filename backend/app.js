require('dotenv').config();
const express = require('express');
const dbConfig = require('./config/db.config.js');


const app = express();

app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' }); 
 });









 module.exports = app;