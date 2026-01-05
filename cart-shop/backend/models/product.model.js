import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    productCode: {
      type: String,
      required: true,
      unique: true,
    },
    thumbnail: {
      type: String,
      default: "http://localhost:8080/upload/assets/NoProduct.png",
    },
    images: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      default: "unknown",
      lowercase: true,
    },
    category: {
      type: String,
      lowercase: true,
    },
    stock: {
      type: Number,
      default: 1,
    },
    description: {
      type: String,
    },
    features: {
      type: Schema.Types.Mixed,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "RegisteredUser",
      required:true
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, timeseries: true }
);

const ProductModel = model("products", ProductSchema);
export default ProductModel;
