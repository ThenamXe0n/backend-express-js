import nodemailer from "nodemailer";

const options = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL, //email id
    pass: process.env.GMAIL_APP_PASSWORD,
  },
};
export const transporter = nodemailer.createTransport(options);

