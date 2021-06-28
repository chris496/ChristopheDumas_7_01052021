const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");
const right = require("../middleware/right");
const auth = require("../middleware/auth");

router.get("/:id", auth, commentCtrl.getComment);
router.get("/", auth, commentCtrl.getAllComment);
router.post("/", auth, commentCtrl.postComment);
router.delete("/:id", auth, right.comment_right, commentCtrl.deleteComment);

module.exports = router;
