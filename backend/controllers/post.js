const connection = require("../config/db.config.js");

exports.createPost = (req, res) => {
    
    //const test = JSON.parse(req.body)
    const Post = {
        "title": req.body.title,
        "description": req.body.description,
        "picture": req.file.filename,
        "user": req.body.userId
    }
    console.log(Post.picture)
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