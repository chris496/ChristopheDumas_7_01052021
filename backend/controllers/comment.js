const connection = require("../config/db.config.js");

// liste tout les commentaires par id
exports.getAllComment = (req, res) => {
    console.log(req.params.id)
    connection.query('SELECT * FROM comment WHERE post=?', req.params.id, function(err, result){
        if(err) {
            return res.status(401).json({error:'erreur'});
          }
        else res.send(result)
    })
}

// création d'un commentaire
exports.postComment = (req, res) => {
    console.log(req.body.description)
    const comment = {
        "description": req.body.description,
        "user": req.body.user,
        "post": req.body.post,
        "added_date": new Date()
    }
    connection.query('INSERT INTO comment SET ?', [comment, req.params.id], function(err, result){
        if(err) {
            return res.status(401).json({error:'erreur'});
          }
          else res.send(result)
          console.log(result)
    })
}

// suppression d'un commentaire
exports.deleteComment = (req, res) => {
    console.log(req.params.id)
    connection.query('DELETE FROM comment WHERE id=?', [req.params.id], function(err, result){
        if(err) {
            return res.status(401).json({error:'erreur'});
          }
        else res.send(result)
    })
}