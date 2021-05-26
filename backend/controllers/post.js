const connection = require("../config/db.config.js");
const fs = require('fs');

// création d'un post
exports.createPost = (req, res) => {
    console.log(req.file.filename)
    const Post = {
        "title": req.body.title,
        "description": req.body.description,
        "picture": `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        "user": req.body.userId,
        "added_date": new Date()
    }
    console.log(Post)
    connection.query('INSERT INTO post SET ?', Post, function(err, result){
        if(err) {
            return res.status(401).json({err});
          }
          else res.send(result)
          console.log(result)
    })
}

// liste tout les posts
exports.getAllPost = (req, res) => {
    connection.query('SELECT firstname, lastname, photo, post.* FROM user INNER JOIN post ON user.id = post.user', function(err, result){
        if(err) {
            return res.status(401).json({error:'erreur'});
          }
          else res.send(result)
          console.log(result)
    })
}

// suppression d'un poste
exports.deletePost = (req, res) => {
    connection.query('SELECT picture FROM post WHERE id=?', [req.params.id], function(err, result){
        console.log(result)
        const filename = result[0].picture.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            console.log('Fichier supprimé !');
        })
    }),
    connection.query('DELETE FROM post WHERE id=?', [req.params.id], function(err, result){
        if(err) {
            return res.status(401).json({error:'erreur'});
          }
        else res.send(result)
    })
}

/*exports.getAllPost = (req, res) => {
    connection.query('SELECT * FROM post', function(err, result){
        if(err) {
            return res.status(401).json({error:'erreur'});
          }
          else res.send(result)
    })
}*/

/*
exports.getAllPost = (req, res) => {
    connection.query('SELECT * FROM post JOIN user ON post.user = user.id', function(err, result){
        if(err) {
            return res.status(401).json({error:'erreur'});
          }
          else res.send(result)
          console.log(result)
    })
}
*/


