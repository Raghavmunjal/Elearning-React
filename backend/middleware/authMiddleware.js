import jwt from "express-jwt";
import dotenv from "dotenv";
import userSchema from "../models/userModel";

dotenv.config();
export const protect = jwt({
  getToken: function fromHeaderOrQuerystring(req) {
    return req.cookies.token;
  },
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
}); // it will req.user

export const isInstructor = async (req, res, next) => {
  try {
    const user = await userSchema
      .findById(req.user.id)
      .select("-password")
      .exec();
    if (!user.role.includes("Instructor"))
      return res.status(403).send("Unauthorized");
    else next();
  } catch (error) {
    console.log(error);
  }
};

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
