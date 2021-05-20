const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');

//router.get('/', userCtrl.getall);
//router.get('/:id', userCtrl.oneUser);
//router.post('/', userCtrl.insert);

router.get('/', auth, userCtrl.getAllUser);
router.get('/:id', auth, userCtrl.oneUser);
router.post('/', auth, userCtrl.insert);

module.exports = router;
