// const http = require("http");
// const data = require("./data/data");
// // console.log("Hello from my first backend server!");
// // sum(22,20)
// // let {sum} = require('./main')
// // console.log(sum(5,10));

// // creating a simple http server using node js
// let server = http.createServer((req, res) => {
//   console.log("response res is :", req.method, req.url);

//   if (req.method == "GET") {
//     switch (req.url) {
//       case "/":
//         res.write("Hello from my first backend server!");
//         res.end("<h1>hellow from server end</h1>");
//         break;
//       case "/products":
//         res.end(JSON.stringify(data));
//         break;
//       case "/details":
//         res.end(JSON.stringify({ name: "John", age: 30, city: "New York" }));
//         break;
//       default:
//         res.statusCode = 404;
//         res.statusMessage = "error";
//         res.end("api not found");
//     }
//   } else if (req.method == "POST") {
//     if (req.url == "/login") {
//       let useremail = req.body?.email;
//       let userpassword = req.body?.password;
//       console.log(req.body);
//       if (useremail == "abc@gmail.com" && userpassword == "12345") {
//         res.end("login successful");
//         return;
//       } else {
//         res.statusCode = 401;
//         res.end("login failed");
//         return;
//       }
//     }
//     res.end("Hello from post method");
//   }
// });

// server.listen(8080, () => {
//   console.log("server is listening on port 8080");
// }); //port , callback
export function healtcheck(req, res) {
  res.send("health is ok");
}
