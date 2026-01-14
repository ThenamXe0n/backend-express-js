const mongoose = require("mongoose")
async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("database connected successfully!")
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = connectDatabase;
