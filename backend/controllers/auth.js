//const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const connection = require('../config/db.config.js');
const sql = require("../config/db.config.js");

exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash =>{
      const User={
        "firstname":req.body.firstname,
        "lastname":req.body.lastname,
        "email":req.body.email,
        "password":hash
      }
      connection.query('INSERT INTO user SET ?', User, function(err, result){
        if(err) {
          return res.status(401).json({error:'erreur d\'insertion'});
        }
        else res.send(result)
      })
    })
    .catch(error => res.status(500).json({error}));
}
      
 // "INSERT INTO `user` (`firstname`,`lastname`,`email`,`password`) VALUES ?"           

exports.login = (req, res) => {
  connection.query('SELECT * FROM user WHERE email=?', req.body.email, function(err, result){
      if(err) {
        return res.status(401).json({error:'Utilisateur non trouvé !'});
      }
      bcrypt.compare(req.body.password, "??????????????????")
  })
}
       

































/*
exports.signup = (req, res) => {
  const encryptedPassword = bcrypt.hash(req.body.password, 1)
  let User={
      "firstname":req.body.firstname,
      "lastname":req.body.lastname,
      "email":req.body.email,
      "password":encryptedPassword
    }
    connection.query('INSERT INTO user SET ', User, function(err, result){
      if(err) {
        return res.status(401).json({error:'erreur d\'insertion'});
      }
      else res.send(result)
    })
}
*/





