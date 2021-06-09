const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');
const pwdvalid = require('../middleware/pwdvalid');

router.post('/signup', pwdvalid, authCtrl.signup);
router.post('/login', authCtrl.login);

module.exports = router;
