const connection = require("../config/db.config.js");
const jwt = require("jsonwebtoken");

// vérification token pour autoriser les requêtes entrantes
exports.user_right = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const userId = decodedToken.userId;
  const isadmin = decodedToken.isadmin;

    connection.query(
      "SELECT isadmin FROM user WHERE id=?",
     userId,
      function (err, result) {
        if (err) {
          return res.status(401).json({ error: "aucun utilisateur trouvé" });
        }
        if (isadmin == 1 || req.params.id == userId) {
          next();
        } else {
          return res.status(401).json({ error: "not allowed" });
        }
      }
    );
  };

exports.post_right = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const userId = decodedToken.userId;
  const isadmin = decodedToken.isadmin;

    connection.query(
      "SELECT * FROM post WHERE id=?",
      req.params.id,
      function (err, result) {
        if (err) {
          return res.status(401).json({ error: "aucun post trouvé" });
        }
        if (req.params.id == result[0].id && userId == result[0].user || isadmin == 1) {
          next();
        } else {
          return res.status(401).json({ error: "not allowed" });
        }
      }
    );
  };

exports.comment_right = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const userId = decodedToken.userId;
  const isadmin = decodedToken.isadmin;

    connection.query(
      "SELECT * FROM comment WHERE id=?",
      req.params.id,
      function (err, result) {
        if (err) {
          return res.status(401).json({ error: "aucun commentaire trouvé" });
        }
        if (req.params.id == result[0].id && userId == result[0].user || isadmin == 1) {
          next();
        } else {
          return res.status(401).json({ error: "not allowed" });
        }
      }
    );
  };