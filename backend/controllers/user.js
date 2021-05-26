const connection = require("../config/db.config.js");

// liste de tout les users
exports.getAllUser = (req, res) => {
    connection.query("SELECT * FROM user", function(err, result){
        if(err) throw err;
        else res.send(result)
    })
};

// obtenir un utilisateur précis
exports.oneUser = (req, res) => {
    connection.query('SELECT * FROM user WHERE id=?', req.params.id, function(err, result){
        if(err) throw err;
        else res.send(result)})
}

// modifier les donnéees d'un utilisateur
exports.updateOneUser = (req, res) => {
    connection.query('UPDATE user SET firstname=?, lastname=?, email=? WHERE id=?', [req.body.firstname, req.body.lastname, req.body.email, req.params.id], function(err, result){
        if(err) {
            return res.status(401).json({error:'erreur'});
          }
        else res.send(result)
    })
}


/*exports.getall = (req, res) => {
    userModel.getAll((err, data) => {
        if(err)
        res.status(500).send({message:"erreur"})
        else res.send(data)
    })
};*/

// enregistrement d'un user dans la base
/*exports.insert = (req, res) => {
    const insertQuery = "INSERT INTO `user` (`email`, `password`,`firstname`,`lastname`) VALUES ('user550@mail.fr','azerty','user1','toto')";
    connection.query(insertQuery, function(err, result){
        if(err) throw err;
        else res.send(result)
    })
};*/