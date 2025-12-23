import "dotenv/config.js";

// const express = require("express")
import express from "express";
import MainRouter from "./routers/main.routes.js";
import connectDb from "./config/mongoDbConnect.js";

//instance of server
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded());

//api routers endpoint
app.get("/", (req, res) => {
  res.send("<h1>server is live</h1>");
});
app.use("/api", MainRouter);

//listing app
const port = process.env.PORT;
app.listen(port, async () => {
  try {
    await connectDb();
    console.log(`server is running on ${port}`);
  } catch (error) {
    console.log(error.message);
    console.log("failed to run server");
  }
});
