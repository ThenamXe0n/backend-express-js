import { Router } from "express";
import { registerUser } from "../controllers/User.controller.js";

const router = Router();

// ============user routers=========
router.post("/user/register", registerUser);

export default router;
