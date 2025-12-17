const {Router} = require("express")
const UserRouter = require("./user.routes")

const router = Router()


router.use("/user",UserRouter)

module.exports = router