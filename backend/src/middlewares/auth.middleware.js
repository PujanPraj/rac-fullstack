import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  try {
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } else {
      throw new ApiError(400, "Not authorized. Please login again");
    }
  } catch (error) {
    throw new ApiError(400, "There is no token or token expired");
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  if (user.role !== "admin") {
    throw new ApiError(400, "You are not admin");
  }

  next();
});
