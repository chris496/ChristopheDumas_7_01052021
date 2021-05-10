//const userModel = require('../models/user');
const connection = require("../config/db.config.js");

exports.insert = (req, res) => {
    const insertQuery = "INSERT INTO `user` (`email`, `password`,`firstname`,`lastname`) VALUES ('user550@mail.fr','azerty','user1','toto')";
    connection.query(insertQuery, function(err, result){
        if(err) throw err;
        else res.send(result)
    })
};

exports.getall = (req, res) => {
    connection.query("SELECT * FROM user",function(err, result){
        if(err) throw err;
        else res.send(result)})
}






/*exports.getall = (req, res) => {
    userModel.getAll((err, data) => {
        if(err)
        res.status(500).send({message:"erreur"})
        else res.send(data)
    })
};*/