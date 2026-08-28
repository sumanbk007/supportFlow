import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app.error.js";
import { sendErrorResponse } from "../utils/api.response.js";

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return sendErrorResponse(res, {
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  console.error(error);

  return sendErrorResponse(res, {
    statusCode: 500,
    message: "Internal server error",
  });
};
