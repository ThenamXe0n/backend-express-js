const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  MRP: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    default:
      "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg",
  },
  category: {
    type: String,
    enum: [
      "smartphone",
      "laptop",
      "tv",
      "tablets",
      "fans",
      "smartwatch",
      "heater",
      "coolers",
      "headphones",
    ],
    required: true,
  },
  brand: {
    type: String,
    default: "unlisted",
  },
  description: {
    type: String,
  },
});

module.exports = model("products", ProductSchema);
