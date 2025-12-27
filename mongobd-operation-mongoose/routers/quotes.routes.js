import express from "express";
import {addNewQuote, deleteQuote, getAllQuote, updateQuote} from "../controllers/quotes.controller.js"

const router = express.Router();


router.get("/",getAllQuote) //create
router.post("/add",addNewQuote) //read
//delete
router.delete("/delete/:quoteId",deleteQuote)

//update 
router.put("/update/:itemId",updateQuote)

export default router;
