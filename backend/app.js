require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

/*app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' }); 
 });
*/

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

app.use(bodyParser.json());
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);






 module.exports = app;