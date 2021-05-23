const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

//router.post('/post', postCtrl.createPost);
//router.get('/', postCtrl.getAllPost);

router.post('/post', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPost);


module.exports = router;