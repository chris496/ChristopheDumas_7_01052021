const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
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

/*
connection.query('SELECT * FROM user', (err,result) => {
    if(err) throw err;

    console.log(result)
})
*/

module.exports = connection;