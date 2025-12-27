import { connect } from "mongoose";

async function connectDatabase() {
  try {
    await connect(process.env.MONGODB_URL);
    console.log("Database connected successfully");
  } catch (error) {
    throw new Error(error);
  }
}


export default connectDatabase;