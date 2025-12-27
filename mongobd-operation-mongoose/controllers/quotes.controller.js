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
    const allQuote = await QuoteModel.find();
    res.status(201).json(allQuote);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export async function deleteQuote(req, res) {
  const id = req.params.quoteId;
  try {
    const deletedItem = await QuoteModel.findByIdAndDelete(id);
    if (!deletedItem) {
      res.status(404).json("item not found!!");
      return;
    }
    res.status(200).json(deletedItem);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

export async function updateQuote(req, res) {
  const id = req.params.itemId;
  try {
    const updatedQuote = await QuoteModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedQuote);
  } catch (error) {
    res.status(500).json(error.message);
  }
}
