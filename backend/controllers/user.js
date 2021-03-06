const connection = require("../config/db.config.js");
const fs = require("fs");

const emailRegex = /(^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$)/;

// obtenir un utilisateur précis
exports.getOneUser = (req, res) => {
  connection.query(
    "SELECT id, firstname, lastname, email, photo, added_date, modif_date, isadmin FROM user WHERE id=?",
    req.params.id,
    function (err, result) {
      if (err) {
        return res.status(401).json({ error: "création user impossible" });
      }
      else res.send(result);
    }
  );
};

// modifier les donnéees d'un utilisateur
exports.updateOneUser = (req, res) => {
  let photo;
  
  if(req.file && req.body.imagedelete){
    photo =
    `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    const filename = req.body.imagedelete.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        console.log("Fichier supprimé !");
      });
  }else {
    photo = req.body.image
  }
  
  const User = {
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    email : req.body.email,  
  }
 
  //verification champs vide, longueur name, regex email
  if (
    User.firstname.length <= 0 ||
    User.lastname.length <= 0 ||
    User.email.length <= 0
  ) {
    return res.status(400).json({ error: "erreur champs vide" });
  }

  if (User.firstname.length <= 2 || User.lastname.length <= 2) {
    return res.status(400).json({ error: "erreur nom trop court" });
  }

  if (!emailRegex.test(User.email)) {
    return res.status(400).json({ error: "regex : email invalid" });
  }

  connection.query(
    "UPDATE user SET firstname=?, lastname=?, email=?, photo=? WHERE id=?",
    [
      User.firstname,
      User.lastname,
      User.email,
      photo,
      req.params.id,
    ],
    function (err, result) {
      if (err) {
        return res.status(401).json({ error: "modification utilisateur impossible" });
      } else res.send(result);
    }
  );
};

//supprimer le profil
exports.deleteOneUser = (req, res) => {
  connection.query(
    "DELETE FROM user WHERE id=?",
    [req.params.id],
    function (err, result) {
      if (err) {
        return res.status(401).json({ error: "suppression impossible" });
      } else res.send(result);
    }
  );
};
