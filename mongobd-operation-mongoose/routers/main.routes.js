import express from "express";
import QuotesRouter from "./quotes.routes.js"
const router = express.Router();

router.use("/quotes",QuotesRouter)

export default router;
