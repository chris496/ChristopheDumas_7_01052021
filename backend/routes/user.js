const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

router.get('/', auth, userCtrl.getAllUser);
router.get('/:id', auth, userCtrl.oneUser);
//router.post('/', auth, userCtrl.insert);
router.put('/:id', auth, multer, userCtrl.updateOneUser);

module.exports = router;
