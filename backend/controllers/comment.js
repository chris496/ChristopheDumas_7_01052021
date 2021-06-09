const connection = require("../config/db.config.js");

// liste tout les commentaires par id
exports.getComment = (req, res) => {
    console.log(req.params.id)
    connection.query('SELECT firstname, lastname, photo, comment.* FROM user INNER JOIN comment ON user.id = comment.user WHERE post=? ORDER BY added_date DESC', req.params.id, function(err, result){
        if(err) {
            return res.status(401).json({error:'erreur'});
          }
        else res.send(result)
    })
}

exports.getAllComment = (req, res) => { 
    connection.query('SELECT * FROM comment', function(err, result){
        console.log(result.id)
        if(err) {
            return res.status(401).json({error:'erreur'});
          }
        else res.send(result)
    })
}

// création d'un commentaire
exports.postComment = (req, res) => {
    
    const comment = {
        "description": req.body.description,
        "user": req.body.user,
        "post": req.body.post,
        "added_date": new Date()
    }

    if (comment.description == ''){
        return res.status(400).json({error:'erreur champs comment vide'});
      }

    console.log(comment)
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