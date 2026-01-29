import UserModel from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { transporter } from "../config/nodemailer.conf.js";

export const registerUser = async (req, res) => {
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

    let responseToSend = {
      ...exist._doc,
      password: undefined,
      refreshToken: undefined,
    };
    // step 3 : generate a jwt token
    let AccessToken = await jwt.sign(
      responseToSend,
      process.env.JWT_SCERET_KEY,
      { expiresIn: "7d" },
    );

    let refreshToken = await jwt.sign(
      { userId: exist._id },
      process.env.JWT_SCERET_KEY,
      { expiresIn: "7d" },
    );

    exist.refreshToken = refreshToken;
    await exist.save();

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

export const forgotPassword = async (req, res) => {
  const { email } = req.query;
  try {
    let user = await UserModel.findOne({ email: email });

    let refreshToken = await jwt.sign(
      { userId: user._id },
      process.env.JWT_SCERET_KEY,
      { expiresIn: "1h" },
    );

    user.refreshToken = refreshToken;
    await user.save();
    // "http://localhost:5173/reset-password/${refreshToken}"

    await transporter.sendMail({
      form: "nameet",
      to: email,
      text: "reset password",
      subject: "reset password",
      html: `<html lang="en">

<body style="margin:0; padding:0; background-color:#f2f4f7; font-family: Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f4f7; padding:40px 0;">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#0d47ff; padding:20px 30px;">
              <h1 style="margin:0; color:#ffffff; font-size:24px;">
                Cart-Shop
              </h1>
              <p style="margin:4px 0 0; color:#e6ebff; font-size:14px;">
                Buy & Sell All Types of Goods
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 30px; color:#111111;">

              <h2 style="margin-top:0; font-size:22px;">
                Reset your password
              </h2>

              <p style="font-size:15px; line-height:1.6; color:#444444;">
                We received a request to reset your Cart-Shop account password. Click the button below to choose a new one.
              </p>

              <!-- Button -->
              <div style="margin:28px 0; text-align:center;">
                <a href="http://localhost:5173/reset-password/${refreshToken}"
                   style="display:inline-block; background:#0d47ff; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:6px; font-weight:bold; font-size:15px;">
                  Reset Password
                </a>
              </div>

              <p style="font-size:14px; line-height:1.6; color:#666666;">
                This link will expire in <strong>30 minutes</strong>. If you didn’t request a password reset, you can safely ignore this email.
              </p>

              <p style="font-size:14px; color:#666666;">
                If the button doesn’t work, copy and paste this link into your browser:
              </p>

              <p style="word-break:break-all; font-size:13px; color:#0d47ff;">
                http://localhost:5173/reset-password/${refreshToken}
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f7f7f7; padding:20px 30px; text-align:center; color:#777777; font-size:12px;">
              <p style="margin:0 0 6px;">
                © {{year}} Cart-Shop. All rights reserved.
              </p>
              <p style="margin:0;">
                Cart-Shop is an ecommerce platform to buy and sell all types of goods and products.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`,
    });

    res.status(201).json({
      status: true,
      message: `reset code sent on email : ${email} `,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    let decode = await jwt.verify(token, process.env.JWT_SCERET_KEY);
    if (!decode) {
      throw new Error("invalid or expired token");
      return;
    }
    // find user details in db
    let user = await UserModel.findById(decode.userId);

    if (user.refreshToken !== token) {
      return res.status(401).json({ message: "invalid token" });
    }

    let hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS),
    );

    user.password = hashedPassword;
    user.refreshToken = "";
    await user.save();

    res
      .status(201)
      .json({ status: true, message: "password reset successfully" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.userId;
    let user = await UserModel.findById(userId);
    // compare old password with user current password
    let isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "old password is incorrect",
      });
    }
    //hash the new password plain text comming from req.body.newpassword
    let hashedPassword = await bcrypt.hash(
      newPassword,
      parseInt(process.env.SALT_ROUNDS),
    );

    user.password = hashedPassword;
    user.save();

    res.status(200).json({
      status: true,
      message: "password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getLoggedInUserDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const logginUser = await UserModel.findById(userId).select(
      "-password -refreshToken",
    );
    if (!logginUser) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      status: true,
      data: logginUser,
      message: "logged in user details fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const updateuserDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const updateData = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password -refreshToken");
    res.status(200).json({
      status: true,
      data: updatedUser,
      message: "User details updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
