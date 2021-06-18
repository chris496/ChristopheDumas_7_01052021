const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");
const comment_right = require("../middleware/comment_right");
const auth = require("../middleware/auth");

router.get("/:id", auth, commentCtrl.getComment);
router.get("/", auth, commentCtrl.getAllComment);
router.post("/", auth, commentCtrl.postComment);
router.delete("/:id", auth, comment_right, commentCtrl.deleteComment);

module.exports = router;
