const { Router } = require("express");
const {addProduct} = require("../controllers/product.controller")

const router = Router();

router.post("/add",addProduct)

module.exports = router;
