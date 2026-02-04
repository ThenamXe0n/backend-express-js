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
    const cartItem = await CartModel.find({ customer })
      .populate("customer", "name email")
      .populate("item");
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

export const removeItemFromCart = async (req, res) => {
  const { cartId } = req.params;
  const customer = req.userId;

  try {
    // check if cart items belongs to req user
    const check = await CartModel.findById(cartId);
    if (!check) {
      res.status(404).json({ message: "item does not exist in cart" });
      return;
    }
    console.log(
      "check db ==>",
      JSON.stringify(check.customer),
      "resquesting user id===>",
      JSON.stringify(customer),
    );
    if (JSON.stringify(check.customer) !== JSON.stringify(customer)) {
      res.status(401).json({
        message: "access not granted!",
      });
      return;
    }
    const response = await CartModel.findByIdAndDelete(cartId);
    res.status(200).json({
      message: `item removed from cart`,
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearUserCart = async (req, res) => {
  console.log("working");
  let customer = req.userId;
  console.log("user id ", customer);
  try {
    const response = await CartModel.deleteMany({
      customer,
    });
    res.status(200).json({
      message: "cart is cleared",
      data: response,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
