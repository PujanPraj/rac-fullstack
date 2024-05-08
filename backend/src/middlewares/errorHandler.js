import { ApiError } from "../utils/ApiError.js";

// not Found
export const notFound = (req, res, next) => {
  const error = new Error(`Page Not Found : ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Error Handler
export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid : ${err.path}`;
    err = new ApiError(400, message);
  }

  //Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValues)} entered`;
    err = new ApiError(400, message);
  }

  //wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const meesage = `Json Web Token is invalid, try again`;
    err = new ApiError(400, meesage);
  }

  //jwt expired error
  if (err.name === "TokenExpiredError") {
    const meesage = `Token has expired, try again`;
    err = new ApiError(400, meesage);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
};
