let fs = require("fs");
// console.log(fs)

//how to read a file using fs
// fs.readFile("file path","encoding type","callback")
// fs.readFile("./index.html","utf-8",(err,content)=>{
//     // console.log("error is ",err)
//     console.log("content is ",content)

// })

// fs.readFile("./notes.txt","utf-8",(err,data)=>{
// console.log(data)
// })

// readfilesync
// console.log(fs.readFileSync("./notes.txt", "utf-8"));

// ===================================write in a file using fs==================
fs.writeFile("./notes.txt", "this is my new text", (err) => {
  if (err) {
    console.log("error is ", err);
    return;
  }
  console.log("file is over ridden successfully!");
});

let html = `
<html>
 <head>
   <title>
   this is my page
   </title>
 </head>
 <body>
    <h1>this file is wriiten by javascript index.js</h1>
 </body>
</html>
`;

// fs.writeFileSync("./index.html", html);
// fs.writeFileSync("./index.html", "hellow");

// =====================add some data in a file  (without replacing  existing data)
// fs.appendFile("./index.html", "world", (error) => {
//   if (error) {
//     console.log("error found : ", error);
//     return;
//   }

//   console.log("data added successfully");
// });

// fs.appendFileSync("./data.txt", "\"nameet\"");
// fs.appendFileSync("./data.txt", "\"tohid\"");
// fs.appendFileSync("./data.txt", "\"komal\"");
// fs.appendFileSync("./data.txt", "\"dheeraj\"");

// ===============how to find if file exist or not===========
fs.exists("./indexkskhfjksdh.html", (check) => {
  console.log("file exist:", check);
}); // old method

let checkfile = fs.existsSync("./notes.txt");
console.log("checked for file nots.txt", checkfile);

// alternative

// ========================delete a file =============
fs.unlink("./index.html", (err) => {
  if (err) {
    console.log("error in deleting", err.message);
    return;
  }
  console.log("file deleted successfully");
});
//===============================create a folder using fs
fs.mkdir("newfolder", { recursive: true }, (err) => {});
fs.rm("./data.txt", (errr) => {});





// =============================================
// 1 fs.readFile || fs.readFileSync
// 2 fs.writeFile || fs.writeFileSync
// 3 fs.appendFile || fs.appendFileSync
// 4 fs.exists || fs.existsSync
// 5 fs.unlink || fs.unlinkSync
// 5 fs.mkdir || fs.mkdirSync
// 5 fs.rm || fs.rm
// 5 fs.rmdir || fs.rmdir

let stats = fs.statSync("./index.js")
console.log(stats)