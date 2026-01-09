import { Router } from "express";
import { loginUser, registerUser } from "../controllers/User.controller.js";
import { addProduct, deleteProduct, deleteProductTemp, getAllProducts, updateProductDetails } from "../controllers/Product.controller.js";
import upload from "../config/multerConfig.js"
const router = Router();

// ============user routers=========
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

//============product routers==========
router.post("/product/create",upload.single("poster") ,addProduct);
router.get("/product/getAll",getAllProducts)
router.patch("/product/update/:id",updateProductDetails)
router.delete("/product/:id",deleteProduct)
router.patch("/product/deleteTemp/:id",deleteProductTemp)

// axios.patch("http://localhost:8080/api/product/update/${product.id}",{name:"abc"})

export default router;
