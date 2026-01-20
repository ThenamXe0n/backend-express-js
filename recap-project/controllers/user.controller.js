const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createUser(req, res) {
  const payload = req.body;
  console.log("payload", payload);

  //incrypt or hash the payload password and than store it in database (we use bcrypt for that)
  let hashedPassword; //null
  hashedPassword = await bcrypt.hash(payload.password, 10);

  console.log("hashed password", hashedPassword);

  try {
    const user = await UserModel.create({
      ...payload,
      password: hashedPassword,
    });
    res.status(201).json({
      message: `account for ${user.name} created !! with id : ${user._id}`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function loginUser(req, res) {
  const email = req.body?.email; //nameet@gmail.com
  const password = req.body?.password; // nm@123
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "user not found!",
      });
    }

    //match password

    let check = await bcrypt.compare(password, user.password);

    if (!check) {
      res.status(401).json({
        message: "invalid credentials . enter correct password and email",
      });
    }

    let jwtPayload = { id: user._id, role: user.role, name: user.name };

    let token = await jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY);

    res.status(200).json({
      message: "user logged in successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = { createUser, loginUser };
