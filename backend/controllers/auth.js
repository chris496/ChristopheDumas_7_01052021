const bcrypt = require("bcrypt");
const connection = require("../config/db.config.js");
const jwt = require("jsonwebtoken");

const emailRegex = /(^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$)/;

// inscription de l'utilisateur
exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        isadmin: 0,
      };

      //verification champs vide, longueur name, regex email
      if (
        User.firstname == "" ||
        User.lastname == "" ||
        User.email == "" ||
        User.password == ""
      ) {
        return res.status(400).json({ error: "erreur champs vide" });
      }

      if (User.firstname.length <= 2 || User.lastname.length <= 2) {
        return res.status(400).json({ error: "erreur trop court" });
      }

      if (!emailRegex.test(User.email)) {
        return res.status(400).json({ error: "regex : email invalid" });
      }

      connection.query("INSERT INTO user SET ?", User, function (err, result) {
        if (err) {
          return res.status(401).json({ error: "erreur d'insertion" });
        } else res.status(201).send(result);
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// connexion de l'utilisateur
exports.login = (req, res) => {
  connection.query(
    "SELECT * FROM user WHERE email=?",
    req.body.email,
    function (err, result) {
      if (result.length == 0) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      } else
        bcrypt
          .compare(req.body.password, result[0].password)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ error: "Mot de passe incorrect !" });
            }
            return res.status(200).json({
              userId: result[0].id,
              token: jwt.sign({ userId: result[0].id, isadmin: result[0].isadmin }, process.env.JWT_TOKEN, {
                expiresIn: "2h",
              }),
            });
          })
          .catch((error) => res.status(500).json({ error: "erreur" }));
    }
  );
};
