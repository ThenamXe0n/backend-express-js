import "dotenv/config.js";

import express from "express";
import cors from "cors";
import connectDatabase from "./config/dbconnection.js";
import ApiRouter from "./routes/api.routes.js";
import cookieParser from "cookie-parser";
import { isVendor } from "./middleware/authmiddlewares.js";
//instance
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use("/upload", express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

//api routes
app.get("/", isVendor, (req, res) => {
  res.send("<h1>server is live</h1>");
});
app.use("/api", ApiRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connectDatabase();
    console.log("server is live at port " + process.env.PORT);
  } catch (err) {
    console.log("error in server setup ", err.message);
  }
});
