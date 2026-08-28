import type { RequestHandler } from "express";
import { ZodError } from "zod";

import { AppError } from "../utils/app.error.js";

export const validate = (schema: {
  parse: (data: unknown) => unknown;
}): RequestHandler => {
  return (req, _res, next) => {
    try {
      req.body = schema.parse(req.body);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(new AppError("Validation failed", 400));

        return;
      }

      next(error);
    }
  };
};
