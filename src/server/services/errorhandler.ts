import { Request, Response, NextFunction } from "express";
import { IErrorhandler } from ".";

const errorHandler = (
  err: IErrorhandler,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Set default values if not provided
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  console.log(`[${new Date().toISOString()}] ${message}`);

  // Log the error (for example, to console or a logging service)
  console.error(`[${new Date().toISOString()}] ${message}`, err);

  // Send error response
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
  next();
};

export default errorHandler;
