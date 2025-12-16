const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb://localhost:27017/shopkart"
    );
    console.log("database is connected successfully");
  } catch (error) {
    throw new Error(error);
  }
};


module.exports = connectDb
