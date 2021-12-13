import jwt from "express-jwt";
import dotenv from "dotenv";

dotenv.config();
export const protect = jwt({
  getToken: function fromHeaderOrQuerystring(req) {
    return req.cookies.token;
  },
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
}); // it will req.user

// import jwt from "jsonwebtoken";
// import asyncHandler from "express-async-handler";
// import UserSchema from "../models/userModel.js";

// const protect = asyncHandler(async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await UserSchema.findById(decoded.id).select("-password");
//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//       throw new Error("Not Authorized,Token Failedf");
//     }
//   }
//   if (!token) {
//     res.status(401);
//     throw new Error("Not Authorized,No Token");
//   }
// });

// const admin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(401);
//     throw new Error("Not Authorized as an admin");
//   }
// };

// export { protect, admin };
