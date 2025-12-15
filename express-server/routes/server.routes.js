const express = require("express")
const { healthCheck } = require("../controllers/server.controller")

const router = express.Router()

router.get("/health",healthCheck)


module.exports = router