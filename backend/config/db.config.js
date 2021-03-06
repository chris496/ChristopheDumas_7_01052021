const mysql = require("mysql");

// connexion à la base de données mysql
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

connection.connect((err) => {
  if (err) {
    console.log("Erreur connexion base", err);
    return;
  }
  console.log("Connexion réussie");
});

module.exports = connection;
