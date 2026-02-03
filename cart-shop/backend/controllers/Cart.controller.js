import CartModel from "../models/cart.model.js";

export const addItemsToCart = async (req, res) => {
  try {
    const customer = req.userId;
    const { item, quantity } = req.body;
    const cartItem = await CartModel.create({ item, quantity, customer });
    res.status(201).json({
      message: `item added to cart successfully`,
      data: cartItem,
      statu: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getUserCart = async (req, res) => {
  try {
    const customer = req.userId;
    const cartItem = await CartModel.find({ customer }).populate('customer',"name email").populate("item");
    res.status(201).json({
      message: `cart item fetched  successfully`,
      data: cartItem,
      statu: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
