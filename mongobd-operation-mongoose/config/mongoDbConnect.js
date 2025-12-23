import { connect } from "mongoose";

async function connectDb() {
  try {
    await connect(process.env.MONGOURL);
    console.log("db connected successfully");
  } catch (err) {
    throw new Error(err);
  }
}


export default connectDb