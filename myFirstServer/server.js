//creating first express js server
const express = require("express");

//creataing app using express
const app = express();
//middleware
app.use(express.json());

//api routes
function rootResponse(req, res) {
  res.send("Hello from my first express js server");
}

app.get("/", rootResponse);
app.post("/login", (req, res) => {
  console.log(req.body);
  res.status(500).json({ name: "John", age: 30, city: "New York" });
});
//app listening on port 8080

app.listen(8080, () => {
  console.log("Express server is listening on port 8080");
});
