const connection = require("../config/db.config.js");

exports.like = (req, res) => {
  const like = {
    user: req.body.user,
    post: req.body.post,
  };
  if (req.body.like == 0) {
    connection.query("INSERT INTO `like` SET ?", like, function (err, result) {
      if (err) {
        return res.status(401).json({ error: "like non ajouté" });
      } else res.send(result);
    });
  } else if (req.body.like == 1) {
    connection.query(
      "DELETE FROM `like` WHERE user=? AND post=?",
      [req.body.user, req.body.post],
      function (err, result) {
        if (err) {
          return res.status(401).json({ error: "suppression impossible" });
        } else res.send(result);
      }
    );
  }
};

exports.getlike = (req, res) => {
  connection.query("SELECT * FROM `like`", function (err, result) {
    if (err) {
      return res.status(401).json({ error: "récupération like impossible" });
    } else res.send(result);
  });
};