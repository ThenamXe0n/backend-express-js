import { Mongoose, Schema, model } from "mongoose";

const CartSchema = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    max: 5,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "RegisteredUser",
    required: true,
  },
});

const CartModel = model("cart", CartSchema);

export default CartModel;
