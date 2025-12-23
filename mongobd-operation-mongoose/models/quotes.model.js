import { Schema, model } from "mongoose";

const QuoteSchema = new Schema(
  {
    quote: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    author: {
      type: String,
      default: "unknown",
    },
  },
  {
    timestamps: true,
    timeseries: true,
  }
);

const quoteModel = model("quotes", QuoteSchema);

export default quoteModel;


