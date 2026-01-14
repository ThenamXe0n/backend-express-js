const { createUser, loginUser } = require("../controllers/user.controller");
const router = require("express").Router();

router.post("/create", createUser);
router.post("/login", loginUser);

module.exports = router;
