const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    lowercase: true,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  courseName: {
    type: String,
  },
  mobile: {
    type: String,
    require: true,
  },
  fee: {
    type: Number,
  },
  password: {
    type: String,
    require: true,
  },
  techStack: [
    {
      type: String,
    },
  ],
});


module.exports = model("Users",UserSchema)