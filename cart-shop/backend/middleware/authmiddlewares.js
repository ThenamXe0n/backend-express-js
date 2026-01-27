import jwt from "jsonwebtoken";

// export const isVendor = async (req, res, next) => {
//   let token = req.headers.authorization;
//   console.log("token", token);
//   try {
//     let decode = await jwt.verify(token, process.env.JWT_SCERET_KEY);
//     if (!decode) {
//       throw new Error("invalid token");
//     }
//     req.user = decode;
//     if (decode.role !== "vendor") {
//       res.status(401).json({
//         message: "unauthorized . protected route",
//       });
//     }
//     next();
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
export const isVendor = async (req, res, next) => {
  let token = req.cookies?.accesstoken;
  console.log("token", token);
  try {
    let decode = await jwt.verify(token, process.env.JWT_SCERET_KEY);
    if (!decode) {
      throw new Error("invalid token");
    }
    req.user = decode;
    if (decode.role !== "vendor") {
      res.status(401).json({
        message: "unauthorized . protected route",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// export const isAdmin = async (req, res, next) => {
//   const token;
//   try {
//     //  decode token
//     let decode = await jwt.verify(token, process.env.JWT_SCERET_KEY);
//     if (!decode) {
//       return res.status(404).json({ message: "invalid token" });
//     }
//     req.user = decode
//     if(decode.role!=="admin"){
//       return res.status(401).json({ message: "access denied!!" });
//     }
//     next()
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

export const isLoggedIn = async (req, res, next) => {
  const token = req.cookies?.accesstoken;
  try {
    //  decode token
    const decode = await jwt.verify(token, process.env.JWT_SCERET_KEY);
    if (!decode) {
      return res.status(404).json({ message: "invalid token or user not logged in" });
    }
    req.userId = decode._id;
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
