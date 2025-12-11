// main file could be main.js or app.js or server.js or index.js

//create a server using express js(install by cmd npm i express)
const express = require("express");
const { registerUserDetails } = require("./controllers/user.controller");
const {
  fetchServerInformation,
  healthCheck,
} = require("./controllers/server.controller");

const { tokenMiddleWare } = require("./middlewares/token");
const { fetchAllQuotes } = require("./controllers/quotes.controller");

//create an instance of express
const app = express();

//middlewares
// middleware are the getway between req to api path . using middleware we can modify or change req before reaching to api path/route
app.use(express.json()); // this will give access to server of req.body
app.use(express.urlencoded());//x-form-urlendocdes form (postman)
app.use(express.static("public")) // used to server static file 
// app.use("/uploads",express.static("uploads"))

// api routes
// app.get(Path, controller function )// get api route
app.get("/", healthCheck); // get api route

app.get("/serverInfo", fetchServerInformation);

app.post("/registerDetails/:id/:username", tokenMiddleWare, registerUserDetails);

app.get("/quotes",fetchAllQuotes)

//server listening on port
// app.listen(PORT, CallbackFn)
app.listen(8080, () => {
  try {
    console.log("Server is running on port 8080");
  } catch (err) {
    console.log("Error in server setup:", err);
  }
});
