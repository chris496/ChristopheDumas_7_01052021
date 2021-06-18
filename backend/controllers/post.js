const connection = require("../config/db.config.js");
const fs = require("fs");

// création d'un post
exports.createPost = (req, res) => {
    console.log(req.file)
  const Post = {
    title: req.body.title,
    description: req.body.description,
    picture: req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : "",
    user: req.body.userId,
    added_date: new Date(),
  };

  /*if (Post.title == "" || Post.description == "") {
    return res.status(400).json({ error: "erreur champs title vide" });
  }*/

  connection.query("INSERT INTO post SET ?", Post, function (err, result) {
    if (err) {
      return res.status(401).json({ err });
    } else res.send(result);
  });
};

// liste tout les posts
exports.getAllPost = (req, res) => {
  connection.query(
    "SELECT firstname, lastname, photo, post.* FROM user INNER JOIN post ON user.id = post.user ORDER BY added_date DESC",
    function (err, result) {
      if (err) {
        return res.status(401).json({ error: "erreur" });
      } else res.send(result);
    }
  );
};

// modifier les donnéees d'un post
exports.updateOnePost = (req, res) => {
  const Post = {
    title: req.body.title,
    description: req.body.description,
    picture: req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : "",
    user: req.body.userId,
    modif_date: new Date(),
  };

const post = req.file ?
    {
        title: req.body.title,
        description: req.body.description,
        user: req.body.userId,
        picture: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    }: {...req.body}
  connection.query(
    "UPDATE post SET title=?, description=?, picture=?, user=? WHERE id=?",
    [
      req.body.title,
      req.body.description,
      post.picture,
      req.body.userId,
      req.params.id,
    ],
    function (err, result) {
      if (err) {
        return res.status(401).json({ error: "erreur" });
      } else res.send(result);
    }
  );
};

// suppression d'un poste
exports.deletePost = (req, res) => {
  connection.query(
    "SELECT picture FROM post WHERE id=?",
    [req.params.id],
    function (err, result) {
      const filename = result[0].picture.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        console.log("Fichier supprimé !");
      });
    }
  ),
    connection.query(
      "DELETE FROM post WHERE id=?",
      [req.params.id],
      function (err, result) {
        if (err) {
          return res.status(401).json({ error: "erreur" });
        } else res.send(result);
      }
    );
};