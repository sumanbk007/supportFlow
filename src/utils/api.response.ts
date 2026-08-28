import type { Response } from "express";

interface SendResponseOptions<T = unknown, M = unknown> {
  statusCode?: number;
  message: string;
  data?: T;
  meta?: M;
}

export const sendResponse = <T = unknown, M = unknown>(
  res: Response,
  options: SendResponseOptions<T, M>,
) => {
  const { statusCode = 200, message, data, meta } = options;

  return res.status(statusCode).json({
    success: true,
    message,
    ...(data !== undefined && { data }),
    ...(meta !== undefined && { meta }),
  });
};

interface SendErrorResponseOptions<M = unknown> {
  statusCode?: number;
  message: string;
  errors?: M;
}

export const sendErrorResponse = <M = unknown>(
  res: Response,
  options: SendErrorResponseOptions<M>,
) => {
  const { statusCode = 500, message, errors } = options;

  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors !== undefined && { errors }),
  });
};
