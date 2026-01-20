const jwt = require("jsonwebtoken");

function verifyUser(req, res, next) {
  console.log("headers", req?.headers?.authorization?.split(" ")[1]);
  if (!req) {
    return;
  }
  // let token = req.headers['Authorization'].split(" ")[1]
  try {
    let decode = jwt.verify(
      req?.headers?.authorization?.split(" ")[1],
      process.env.JWT_SECRET_KEY
    );
    console.log("decoded", decode);
    req.user = decode;

    if (decode.role !== "admin") {
      return res?.status(401).json({
        message: "only admin can access",
      });
    }

    next();
  } catch (error) {
    return res.json({ message: error.message });
  }
}

module.exports = { verifyUser };
