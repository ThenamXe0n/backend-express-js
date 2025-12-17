const mongoose = require("mongoose");

async function dbconnect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database is connected!!");
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = dbconnect;
