const { Router } = require("express");
const { registerUser, getUserList } = require("../controllers/user.controller");

const router = Router();
router.post("/register", registerUser);
router.get("/getall",getUserList)

module.exports = router;
