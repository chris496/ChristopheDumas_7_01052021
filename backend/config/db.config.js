const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

connection.connect((err) => {
    if(err){
        console.log('Erreur connexion base');
        return;
    }
    console.log('Connexion réussie')
});

module.exports = connection;