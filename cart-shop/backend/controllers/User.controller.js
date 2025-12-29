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

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // step 1: find user by email
    const exist = await UserModel.findOne({ email: email });
    if (!exist) {
      res.status(404).json({
        message: "User not found",
        data: null,
      });
      return;
    }
    // step 2: check password
    if (exist.password !== password) {
      res.status(401).json({
        message: "Invalid password",
        data: null,
      });
      return;
    }
    // step 3: send response
    let responseToSend = { ...exist._doc, password: undefined };
    res.status(200).json({
      message: "User logged in successfully",
      data: responseToSend,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};
