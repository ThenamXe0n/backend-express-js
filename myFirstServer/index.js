const http = require("http")
// console.log("Hello from my first backend server!");
// sum(22,20)
// let {sum} = require('./main')
// console.log(sum(5,10));


// creating a simple http server using node js
let server = http.createServer((req, res) => {
  res.write("Hello from my first backend server!");
  res.end("<h1>hellow from server end</h1>");
});

server.listen(8080,()=>{
    console.log("server is listening on port 8080");
}) //port , callback