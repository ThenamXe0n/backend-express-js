const express = require("express")
const {loginUser,registerUserDetails} = require("../controllers/user.controller")
const router = express.Router()


router.post("/login",loginUser)
router.post("/register",registerUserDetails)

module.exports = router