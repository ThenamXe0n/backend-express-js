import { Router } from "express";
import { changePassword, forgotPassword, getLoggedInUserDetails, loginUser, registerUser, resetPassword, updateuserDetails } from "../controllers/User.controller.js";
import { addProduct, deleteProduct, deleteProductTemp, getAllProducts, getApprovedProducts, getSingleProductByProductCode, updateProductDetails } from "../controllers/Product.controller.js";
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
router.get("/product/getApproved",getApprovedProducts)
router.patch("/product/update/:id",updateProductDetails)
router.delete("/product/:id",deleteProduct)
router.patch("/product/deleteTemp/:id",deleteProductTemp)
router.get("/product/getSingle/:productCode",getSingleProductByProductCode)

router.get("/loggedInUser",isLoggedIn,getLoggedInUserDetails)
router.patch("/update-profile-details",isLoggedIn,updateuserDetails)

// axios.patch("http://localhost:8080/api/product/update/${product.id}",{name:"abc"})

export default router;
