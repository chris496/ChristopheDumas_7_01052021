const jwt = require('jsonwebtoken');

// vérification token pour autoriser les requêtes entrantes
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN,);
    const userId = decodedToken.userId;
    //console.log(userId)
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: ('Invalid request!')
    });
  }
};


exports.updateOneUser = (req, res) => {
  console.log(req.body)
  if (req.body.firstname == '' || req.body.lastname == '' || req.body.email == ''){
      return res.status(400).json({error:'erreur champs vide'});
    }
  //console.log(req.file.filename)
  const user = req.file ?
  {
      ...JSON.parse(req.body),
      photo: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  }: {...req.body}
  connection.query('UPDATE user SET firstname=?, lastname=?, email=?, photo=? WHERE id=?', [req.body.firstname, req.body.lastname, req.body.email, user.photo, req.params.id], function(err, result){
      if(err) {
          return res.status(401).json({error:'erreur'});
        }
      else res.send(result)
  })
}
