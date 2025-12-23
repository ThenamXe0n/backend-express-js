import express from "express";
import {addNewQuote, getAllQuote} from "../controllers/quotes.controller.js"

const router = express.Router();


router.get("/",getAllQuote)
router.post("/add",addNewQuote)

export default router;
