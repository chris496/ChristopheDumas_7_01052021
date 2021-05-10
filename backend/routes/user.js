const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


router.get('/', userCtrl.getall);
router.post('/', userCtrl.insert);


module.exports = router;
