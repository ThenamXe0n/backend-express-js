const express = require("express");
const UserRouter = require("./user.routes");
const ServerRouter = require("./server.routes")
const { registerUserDetails } = require("../controllers/user.controller");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("workinng");
});
router.use("/user", UserRouter);
router.use("/server",ServerRouter)

module.exports = router;
