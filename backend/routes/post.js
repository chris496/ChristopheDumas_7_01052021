const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

const auth = require('../middleware/auth');

//router.post('/post', postCtrl.createPost);
//router.get('/', postCtrl.getAllPost);

router.post('/post', auth, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPost);


module.exports = router;