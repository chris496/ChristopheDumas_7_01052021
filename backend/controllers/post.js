const connection = require("../config/db.config.js");

exports.createPost = (req, res) => {
    const Post = {
        "user":req.body.user,
        "title":req.body.title,
        "description":req.body.description,
        "picture":req.body.picture,
        "added_date":req.body.added_date,
        "modif_date":req.body.modif_date,
    }
    connection.query('INSERT INTO post SET ?', Post, function(err, result){
        if(err) {
            return res.status(401).json({err});
          }
          else res.send(result)
    })
}

exports.getAllPost = (req, res) => {
    connection.query('SELECT * FROM post JOIN user ON post.user = user.id', function(err, result){
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