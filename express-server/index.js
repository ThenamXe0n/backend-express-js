// main file could be main.js or app.js or server.js or index.js

//create a server using express js(install by cmd npm i express)
const express = require("express");

//create an instance of express
const app = express();

//middlewares
app.use(express.json());

// api routes
// app.get(Path, controller function )// get api route
app.get("/", (req, res) => {
  res.status(200);
  res.send(
    `<h1>welcome to the server</h1>
    <table style="border:1px solid black; border-collapse:collapse;">
    <tr style="border:1px solid black">
     <td style="border:1px solid black">status</td>
     <td style="border:1px solid black">value</td>
    </tr>
    <tr style="border:1px solid black">
    <td style="border:1px solid black">200</td>
    <td style="border:1px solid black" >Ok</td>
    </tr>
    </table>`
  );
}); // get api route

app.get("/serverInfo", (req, res) => {
  res.status(200);
  res.send({
    server: "express js",
    level: "low",
    apiEndPoints: 2,
    apiMethods: ["GET", "POST"],
  });
});

app.post("/registerDetails", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  console.log(req.query);
  res.status(200);
  res.json("completedzs");
});


//server listening on port
// app.listen(PORT, CallbackFn)
app.listen(8080, () => {
  try {
    console.log("Server is running on port 8080");
  } catch (err) {
    console.log("Error in server setup:", err);
  }
});
