import "dotenv/config.js";

import express from "express";
import cors from "cors";
import connectDatabase from "./config/dbconnection.js";
import ApiRouter from "./routes/api.routes.js";
//instance
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: "*",
  })
);

//api routes
app.get("/", (req, res) => {
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
