import { Router } from "express";
import { loginUser, registerUser } from "../controllers/User.controller.js";

const router = Router();

// ============user routers=========
router.post("/user/register", registerUser);
router.post("/user/login",loginUser)

export default router;
