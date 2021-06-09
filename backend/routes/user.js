const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

//router.get('/', auth, userCtrl.getAllUser);
router.get('/:id', auth, userCtrl.getOneUser);
//router.post('/', auth, userCtrl.insert);
router.put('/:id', auth, multer, userCtrl.updateOneUser);
router.delete('/:id', auth, userCtrl.deleteOneUser);

module.exports = router;
