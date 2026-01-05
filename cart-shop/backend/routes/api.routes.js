import { Router } from "express";
import { loginUser, registerUser } from "../controllers/User.controller.js";
import { addProduct, getAllProducts } from "../controllers/Product.controller.js";
import upload from "../config/multerConfig.js"
const router = Router();

// ============user routers=========
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

//============product routers==========
router.post("/product/create",upload.single("poster") ,addProduct);
router.get("/product/getAll",getAllProducts)

export default router;
