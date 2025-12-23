import QuoteModel from "../models/quotes.model.js";

export async function addNewQuote(req, res) {
  try {
    const createQuote = await QuoteModel.create(req.body);
    res.status(201).json(createQuote);
  } catch (error) {
    res.status(500).json(error.message);
  }
}
export async function getAllQuote(req, res) {
  try {
    const allQuote = await QuoteModel.find({author:"unkjhjk"});
    res.status(201).json(allQuote);
  } catch (error) {
    res.status(500).json(error.message);
  }
}


