import ProductModel from "../models/product.model.js";
import generateProductCode from "../utils/generateProductCode.js";

export async function addProduct(req, res) {
  console.log("controller file from multer",req.file)


  let filePath =`${req.protocol}://${req.host}/${req.file.destination}/${req.file.filename}`
  try {
    const generatedCode = generateProductCode();
    const product = await ProductModel.create({
      ...req.body,
      productCode: generatedCode,
      thumbnail:filePath
    });
    res.status(201).json({
      message: "Product posted successfully, wait for approval by admin",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
}

export async function getAllProducts(req, res) {
  try {
    const allProducts = await ProductModel.find().populate(
      "seller",
      "name address email"
    );
    if (allProducts.length < 1) {
      res.status(404).json({
        message: "no product available to show",
        data: allProducts,
      });
      return;
    }
    res.status(200).json({
      message: "All products loaded..",
      data: allProducts,
    });
  } catch {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
}


//update

//delete

//admin access getall

//admin access update
