const connection = require("../config/db.config.js");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const userId = decodedToken.userId;
  const isadmin = decodedToken.isadmin;

  connection.query(
    "SELECT * FROM post WHERE id=?",
    req.params.id,
    function (err, result) {
      if (err) {
        return res.status(401).json({ error: "erreur" });
      }
      console.log(result[0])
      if (req.params.id == result[0].id && userId == result[0].user || isadmin == 1) {
        next();
      } else {
        return res.status(401).json({ error: "not allowed" });
      }
    }
  );
};


/*
const connection = require("../config/db.config.js");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const userId = decodedToken.userId;

  connection.query(
    "SELECT * FROM post WHERE id=?",
    req.params.id,
    function (err, result) {
      if (err) {
        return res.status(401).json({ error: "erreur" });
      }
      console.log(result[0])
      if (req.params.id == result[0].id && userId == result[0].user || result[0].isadmin == 1) {
        next();
      } else {
        return res.status(401).json({ error: "not allowed" });
      }
    }
  );
};
*/
