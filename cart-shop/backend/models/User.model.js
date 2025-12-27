import { Schema, model } from "mongoose";

//define schema of user i.e details format of user

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "vendor", "admin"],
      default: "user",
    },
    contactno: {
      type: String,
    },
    address: {
      type: [
        {
          houseNo: String,
          street: String,
          city: String,
          state: String,
          country: String,
          pincode: String,
        },
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    timeseries: true,
  }
);

const UserModel = model("RegisteredUser", UserSchema);
export default UserModel;
