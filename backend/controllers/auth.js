const bcrypt = require('bcrypt');
const connection = require('../config/db.config.js');
const jwt = require('jsonwebtoken')

// inscription de l'utilisateur
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
        else res.status(201).send(result)
      })
    })
    .catch(error => res.status(500).json({error}));
}
 
// connexion de l'utilisateur
exports.login = (req, res) => {
  connection.query('SELECT * FROM user WHERE email=?', req.body.email, function(err, result){
      if(result.length == 0) {
        return res.status(401).json({error:'Utilisateur non trouvé !'});
      }
      else bcrypt.compare(req.body.password, result[0].password)
      .then(valid => {
        console.log(valid)
        if(!valid){
          return res.status(401).json({error:'Mot de passe incorrect !'});
        }
        return res.status(200).json({
          userId: result[0].id,
          token: jwt.sign(
            {userId: result[0].id},
            'JWT_TOKEN',
            { expiresIn: '2h' }
            )
        })
      })
      .catch(error => res.status(500).json({ error: "erreur"}));
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





