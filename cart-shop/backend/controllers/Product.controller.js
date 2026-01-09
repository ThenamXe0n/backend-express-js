import ProductModel from "../models/product.model.js";
import ApiResponse from "../utils/apiResponseHandler.js";
import generateProductCode from "../utils/generateProductCode.js";

export async function addProduct(req, res) {
  console.log("controller file from multer", req.file);

  let filePath = `${req.protocol}://${req.host}/${req.file.destination}/${req.file.filename}`;
  try {
    const generatedCode = generateProductCode();
    const product = await ProductModel.create({
      ...req.body,
      productCode: generatedCode,
      thumbnail: filePath,
    });

    res
      .status(201)
      .json(
        new ApiResponse(
          true,
          "Product posted successfully, wait for approval by admin",
          product
        )
      );
  } catch (error) {
    res.status(500).json(new ApiResponse(false, error.message));
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

export async function updateProductDetails(req, res) {
  // let payload = req.body;
  let id = req.params.id
  console.log(id)
  // console.log("parms are",req.params.productId)

  try {
    let updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body,{new:true});
    res
      .status(200)
      .json(new ApiResponse(true, "product updated!", updatedProduct));
  } catch (error) {
    res.status(500).json(new ApiResponse(false, error.message));
  }
}

//soft delete
export async function deleteProductTemp(req, res) {
  // let payload = req.body;
  let id = req.params.id
  // console.log("parms are",req.params.productId)

  try {
    let deletedProduct = await ProductModel.findByIdAndUpdate(id,{isDeleted:true},{new:true});
    res
      .status(200)
      .json(new ApiResponse(true, "product moved to trash!", deletedProduct));
  } catch (error) {
    res.status(500).json(new ApiResponse(false, error.message));
  }
}
//hard delete
export async function deleteProduct(req, res) {
  // let payload = req.body;
  let id = req.params.id
  console.log(id)
  // console.log("parms are",req.params.productId)

  try {
    let deletedProduct = await ProductModel.findByIdAndDelete(id);
    res
      .status(200)
      .json(new ApiResponse(true, "product deleted!", deletedProduct));
  } catch (error) {
    res.status(500).json(new ApiResponse(false, error.message));
  }
}
//admin access getall

//admin access update
