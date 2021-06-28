const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

const auth = require("../middleware/auth");
const right = require("../middleware/right");
const multer = require("../middleware/multer");

router.get("/:id", auth, userCtrl.getOneUser);
router.put("/:id", auth, right.user_right, multer, userCtrl.updateOneUser);
router.delete("/:id", auth, right.user_right, userCtrl.deleteOneUser);

module.exports = router;
