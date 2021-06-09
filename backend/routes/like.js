const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like');

const auth = require('../middleware/auth');

router.post('/', auth, likeCtrl.like);
router.get('/', auth, likeCtrl.getlike);
router.delete('/:id', auth, likeCtrl.deletelike);

module.exports = router;