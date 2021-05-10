const connection = require("../config/db.config.js");

exports.createPost = (req, res) => {
    const Post = {
        "user":req.body.user,
        "title":req.body.title,
        "body":req.body.body,
       // "date":req.body.date
    }
    connection.query('INSERT INTO post SET ?', Post, function(err, result){
        if(err) {
            return res.status(401).json({error:'erreur'});
          }
          else res.send(result)
    })
}

exports.getAllPost = (req, res) => {
    connection.query('SELECT * FROM post', function(err, result){
        if(err) {
            return res.status(401).json({error:'erreur'});
          }
          else res.send(result)
    })
}