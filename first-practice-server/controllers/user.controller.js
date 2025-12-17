const User = require("../models/user.model");

const registerUser = async (req, res) => {
  const payload = req.body;
  try {
    const create = await User.create(payload);
    res.status(201).json({
      data: create,
      message: "user created successfully",
      status: true,
    });
  } catch (err) {
    res.status(500).send("error in server", err);
  }
};
const getUserList = async (req, res) => {
  try {
    const list = await User.find();
    res.status(200).json({
      data: list,
      message: "user loaded",
      status: true,
    });
  } catch (err) {
    res.status(500).send("error in server", err);
  }
};

module.exports = { registerUser, getUserList };
