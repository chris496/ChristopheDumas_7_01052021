const connection = require("../config/db.config.js");
const jwt = require("jsonwebtoken");

// vérification token pour autoriser les requêtes entrantes
module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const userId = decodedToken.userId;
  const isadmin = decodedToken.isadmin;

  connection.query(
    "SELECT isadmin FROM user WHERE id=?",
   userId,
    function (err, result) {
      if (err) {
        return res.status(401).json({ error: "erreur" });
      }
      console.log(result[0].isadmin)
      if (isadmin == 1 || req.params.id == userId) {
        next();
      } else {
        return res.status(401).json({ error: "not allowed" });
      }
    }
  );
};
