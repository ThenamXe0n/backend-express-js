const Product = require("../models/product.model");
const { ApiResponse } = require("../utils/ApiResponse");

const addProduct = async (req, res) => {
  try {
    console.log(req.body)
    //logic
    let newProduct = await Product.create(req.body);

    res
      .status(201)
      .json(new ApiResponse(newProduct, true, "created successfully"));
  } catch (error) {
    console.log("error found");
    res.status(500).json(error);
  }
};

module.exports = { addProduct };
