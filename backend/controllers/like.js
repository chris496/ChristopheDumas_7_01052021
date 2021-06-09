const connection = require("../config/db.config.js");

exports.like = (req, res) => {
    console.log(req.body)
    const like = {
        "user": req.body.user,
        "post": req.body.post
    }
    if(req.body.like == 0){
        connection.query('INSERT INTO `like` SET ?', like, function(err, result){
            if(err) {
                return res.status(401).json({error:'erreur'});
              }
              else res.send(result)
        })  
            }
    if(req.body.like == 1){
        connection.query('DELETE FROM `like` WHERE user=?, post=?', like, function(err, result){
            console.log(err)
        console.log(result)
                    if(err) {
                        return res.status(401).json({error:'impossible de supprimer'});
                      }
                      else res.send(result)
                })
              }
            
    }
    
    
exports.deletelike = (req, res) => {
    console.log(req.params.id)
    connection.query('DELETE FROM `like` WHERE id=?', [req.params.id], function(err, result){
       if(err) {
            return res.status(401).json({error:'erreur'});
          }
        else res.send(result)
    })
}

exports.getlike = (req, res) => {
    connection.query("SELECT * FROM `like`", function(err, result){
        if(err) throw err;
        else res.send(result)
    })
}

/*
exports.like = (req, res) => {
    console.log(req.body)
    const like = {
        "user": req.body.user,
        "post": req.body.post
    }
    connection.query('INSERT INTO like SET ?', like, function(err, result){
        if(err) {
            return res.status(401).json({error:'erreur'});
          }
          else res.send(result)
          console.log(result)
    })
}
*/

/*exports.like = (req, res) => {
    console.log(req.body)
    const like = {
        "user": req.body.user,
        "post": req.body.post
    }
    
    connection.query('SELECT user, post FROM `like` WHERE user=105 and post=230', function(err, result){
        if(result.length == 0){
            connection.query('INSERT INTO `like` SET ?', like, function(err, result){
                if(err) {
                    return res.status(401).json({error:'erreur'});
                  }
                  else res.send(result)
                  console.log('ID dernière insertion:', result.insertId)
            })
          }else if(result){
            return res.status(401).json({error:'erreur'});
          }
    })

    connection.query('INSERT INTO `like` SET ?', like, function(err, result){
        if(err) {
            return res.status(401).json({error:'erreur'});
          }
          else res.send(result)
          console.log('ID dernière insertion:', result.insertId)
    })
}*/