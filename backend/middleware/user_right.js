const connection = require("../config/db.config.js");
const jwt = require("jsonwebtoken");

// vérification token pour autoriser les requêtes entrantes
module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const userId = decodedToken.userId;

  connection.query(
    "SELECT * FROM user WHERE id=?",
    req.params.id,
    function (err, result) {
      if (err) {
        return res.status(401).json({ error: "erreur" });
      }
      //result[0].isadmin == 0 || 
      if (req.params.id != userId) {
        return res.status(401).json({ error: "not allowed" });
      } else {
        next();
      }
    }
  );
};
