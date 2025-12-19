const { Router } = require("express");
const UserRouter = require("./user.routes");
const ProductRouter = require("./product.routes");

const router = Router();

router.use("/user", UserRouter);
router.use("/product",ProductRouter);

module.exports = router;
