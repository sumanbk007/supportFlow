import type { Request, Response } from "express";

import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../services/user.service.js";

import { sendResponse } from "../utils/api.response.js";

export const getUsersController = async (_req: Request, res: Response) => {
  const users = await getUsers();

  return sendResponse(res, {
    message: "Users retrieved successfully",
    data: users,
  });
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const user = await getUserById(req.params.id);

  return sendResponse(res, {
    message: "User retrieved successfully",
    data: user,
  });
};

export const updateUserController = async (req: Request, res: Response) => {
  const user = await updateUser(req.params.id, req.body);

  return sendResponse(res, {
    message: "User updated successfully",
    data: user,
  });
};

export const deleteUserController = async (req: Request, res: Response) => {
  await deleteUser(req.params.id);

  return sendResponse(res, {
    message: "User deleted successfully",
  });
};
