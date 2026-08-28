import type { NextFunction, Request, Response } from "express";

import { UserRole } from "../../generated/prisma/client.js";

import { AppError } from "../utils/app.error.js";

export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new AppError("Authentication required", 401));
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      next(new AppError("You are not authorized to perform this action", 403));
      return;
    }

    next();
  };
};
