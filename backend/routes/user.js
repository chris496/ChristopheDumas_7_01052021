const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

const auth = require("../middleware/auth");
const user_right = require("../middleware/user_right");
const multer = require("../middleware/multer");

router.get("/:id", auth, userCtrl.getOneUser);
router.put("/:id", auth, user_right, multer, userCtrl.updateOneUser);
router.delete("/:id", auth, userCtrl.deleteOneUser);

module.exports = router;
