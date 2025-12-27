import UserModel from "../models/User.model.js";

export const registerUser = async (req, res) => {
  try {
    const response = await UserModel.create(req.body);
    let responseToSend = { ...response._doc, password: undefined };
    res.status(201).json({
      message: "User registered successfully",
      data: responseToSend,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    // throw error;
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};
