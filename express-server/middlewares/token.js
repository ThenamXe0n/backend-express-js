function tokenMiddleWare(req, res, next) {
  console.log("middleware started");
  req.token = "tokenNo0908";
  req.tohid = "web developer"
  next();
}



module.exports = { tokenMiddleWare };
