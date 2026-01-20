const express = require("express");
const app = express();
const PORT = 3000;


//middleware
app.use(express.json())


// /api routes
app.get("/", (req, res) => {
  res.send("Hello, Express.js 2026!");
});

app.post("/api/data", (req, res) => {
  // Request object properties
  console.log("Body:", req.body);
  console.log("Headers:", req.headers);
  console.log("IP:", req.ip);
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Cookies:", req.cookies); // Requires cookie-parser

  // Response methods
  // res.send('Text response');
  // res.json({ key: 'value' });
  // res.status(404).send('Not found');
  // res.redirect('/other-route');
  // res.download('./file.pdf');

  res.status(201).json({
    success: true,
    message: "Data created",
    data: req.body,
  });
});

app.get("/sendCookies",(req,res)=>{
    res.cookie("my-token","abc123", {
    httpOnly: true,
    secure: true,
    maxAge: 4 * 24 * 60 * 60 * 1000//milisecond
  })
    return res.json("cookies set")
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
