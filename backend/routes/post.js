const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");

const auth = require("../middleware/auth");
const post_right = require("../middleware/post_right");
const multer = require("../middleware/multer");

router.post("/", auth, multer, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPost);
router.put("/:id", auth, post_right, multer, postCtrl.updateOnePost);
router.delete("/:id", auth, post_right, multer, postCtrl.deletePost);

module.exports = router;
