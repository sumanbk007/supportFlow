import type { Request, Response } from "express";

import { login, registerCustomer } from "../services/auth.service.js";

import { sendResponse } from "../utils/api.response.js";

export const registerController = async (req: Request, res: Response) => {
  const user = await registerCustomer(req.body);

  return sendResponse(res, {
    statusCode: 201,
    message: "Customer registered successfully",
    data: user,
  });
};

export const loginController = async (req: Request, res: Response) => {
  const result = await login(req.body);

  return sendResponse(res, {
    message: "Login successful",
    data: result,
  });
};
