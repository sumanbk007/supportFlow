import { Router } from "express";

import {
  deleteUserController,
  getUserByIdController,
  getUsersController,
  updateUserController,
} from "../controllers/user.controller.js";

import { updateUserSchema } from "../validations/user.validation.js";
import ROUTES from "../constants/routes.constant.js";
import { validate } from "../middleware/validations.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get(ROUTES.USERS, authenticate, asyncHandler(getUsersController));

router.get(ROUTES.USER_BY_ID, asyncHandler(getUserByIdController));

router.patch(
  ROUTES.USER_BY_ID,
  validate(updateUserSchema),
  asyncHandler(updateUserController),
);

router.delete(ROUTES.USER_BY_ID, asyncHandler(deleteUserController));

export default router;
