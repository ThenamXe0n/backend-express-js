// main file could be main.js or app.js or server.js or index.js

//create a server using express js(install by cmd npm i express)
const express = require("express");
const MainApiEndPoint = require("./routes/api.routes");
const { registerUserDetails } = require("./controllers/user.controller");
const {
  fetchServerInformation,
  healthCheck,
} = require("./controllers/server.controller");

const { tokenMiddleWare } = require("./middlewares/token");
const { fetchAllQuotes } = require("./controllers/quotes.controller");
const cors = require("cors");
const connectDb = require("./config/connectDb");

//create an instance of express
const app = express();

//middlewares
// middleware are the getway between req to api path . using middleware we can modify or change req before reaching to api path/route
app.use(express.json()); // this will give access to server of req.body
app.use(express.urlencoded()); //x-form-urlendocdes form (postman)
app.use("/myassets", express.static("public")); // used to server static file
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://127.0.0.1:5501"], // this grant permission to origin , * mean all origin "http://127.0.0.1:5500"
    methods: ["GET"],
  })
);
// app.use("/uploads",express.static("uploads"))

// api routes
// app.get(Path, controller function )// get api route
// app.get("/", healthCheck); // get api route
app.use("/api", MainApiEndPoint);

// app.get("/serverInfo", fetchServerInformation);

// app.get("/quotes", fetchAllQuotes);

//server listening on port
// app.listen(PORT, CallbackFn)
app.listen(8080, async () => {
  try {
    await connectDb();
    console.log("Server is running on port 8080");
  } catch (err) {
    console.log("Error in server setup:", err);
  }
});
