require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { healthCheck } = require("./controllers/server.controller");
const connectDB = require("./config/mongodb");
const MainRouter = require("./routes/main.routes")
//instance of express app
const app = express();

//middleware
app.use(express.json()); //allow body to passed by req
app.use(express.urlencoded());
app.use("/static", express.static("public"));
app.use(
  cors({
    origin: "*",
  })
);

//api end point
app.get("/", healthCheck);
app.use("/api",MainRouter)
//api end point

app.listen(process.env.PORT, async () => {
  try {
    await connectDB();
    console.log("server is listing on port", process.env.PORT);
  } catch (error) {
    console.log(error.message);
  }
});
