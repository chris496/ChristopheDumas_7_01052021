const connection = require("../config/db.config.js");



// obtenir un utilisateur précis
exports.getOneUser = (req, res) => {
    connection.query('SELECT id, firstname, lastname, email, photo, added_date, modif_date, isadmin FROM user WHERE id=?', req.params.id, function(err, result){
        if(err) throw err;
        else res.send(result)})
}

// modifier les donnéees d'un utilisateur
exports.updateOneUser = (req, res) => {
    if (req.body.firstname == '' || req.body.lastname == '' || req.body.email == ''){
        return res.status(400).json({error:'erreur champs vide'});
      }
    //console.log(req.file.filename)
    const user = {
        "photo": req.file
        ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        : null
    }
    connection.query('UPDATE user SET firstname=?, lastname=?, email=?, photo=? WHERE id=?', [req.body.firstname, req.body.lastname, req.body.email, user.photo, req.params.id], function(err, result){
        if(err) {
            return res.status(401).json({error:'erreur'});
          }
        else res.send(result)
    })
}

//supprimer le profil
exports.deleteOneUser = (req, res) => {
    console.log(req.params.id)
    connection.query('DELETE FROM user WHERE id=?', [req.params.id], function(err, result){
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

/*// liste de tout les users
exports.getAllUser = (req, res) => {
    connection.query("SELECT * FROM user", function(err, result){
        if(err) throw err;
        else res.send(result)
    })
};*/