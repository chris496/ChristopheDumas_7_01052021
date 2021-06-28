const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");

const auth = require("../middleware/auth");
const right = require("../middleware/right");
const multer = require("../middleware/multer");

router.post("/", auth, multer, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPost);
router.delete("/:id", auth, right.post_right, multer, postCtrl.deletePost);

module.exports = router;
