import { Router } from "express";
import { changePassword, forgotPassword, loginUser, registerUser, resetPassword } from "../controllers/User.controller.js";
import { addProduct, deleteProduct, deleteProductTemp, getAllProducts, updateProductDetails } from "../controllers/Product.controller.js";
import upload from "../config/multerConfig.js"
import { isLoggedIn, isVendor } from "../middleware/authmiddlewares.js";
const router = Router();

// ============user routers=========
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/forgot-password",forgotPassword)
router.post("/reset-password",resetPassword)
router.post("/change-password",isLoggedIn,changePassword)

//============product routers==========
router.post("/product/create",isVendor,upload.single("poster") ,addProduct);
router.get("/product/getAll",isVendor,getAllProducts)
router.patch("/product/update/:id",updateProductDetails)
router.delete("/product/:id",deleteProduct)
router.patch("/product/deleteTemp/:id",deleteProductTemp)

// axios.patch("http://localhost:8080/api/product/update/${product.id}",{name:"abc"})

export default router;
