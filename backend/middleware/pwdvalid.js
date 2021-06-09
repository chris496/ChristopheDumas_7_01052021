const passwordValidator = require('password-validator');
//const schema = require('../models/pwd');

const schema = new passwordValidator();

// schéma de validation des mots de passe
schema
.is().min(8)
.is().max(100)
.has().uppercase()
.has().lowercase()
.has().not().spaces()

// retour d'erreur si mot de passe trop faible
module.exports = (req, res, next) => {
    if (!schema.validate(req.body.password)){
        return res.status(400).json ({error: 'mot de passe trop faible' + schema.validate('essai', {list: true})})
    }
    next()
}