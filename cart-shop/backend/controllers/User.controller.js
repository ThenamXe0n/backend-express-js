import UserModel from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  console.log("type of salt value", typeof process.env.SALT_ROUNDS);
  try {
    let hashedPassword = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.SALT_ROUNDS),
    );
    const response = await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });
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
    let compare = await bcrypt.compare(password, exist.password);
    if (!compare) {
      res.status(401).json({
        message: "Invalid password",
        data: null,
      });
      return;
    }

    let responseToSend = { ...exist._doc, password: undefined };
    // step 3 : generate a jwt token
    let AccessToken = await jwt.sign(
      responseToSend,
      process.env.JWT_SCERET_KEY,
    );

    res.cookie("accesstoken", AccessToken, {
      sameSite: "Lax", //local Lax, None
      httpOnly: true,
      secure: false, // http = > false , https ==> true
      maxAge: 4 * 24 * 60 * 60 * 1000,
    });

    // step 4: send response
    res.status(200).json({
      message: "User logged in successfully",
      data: responseToSend,
      accesstoken: AccessToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};
