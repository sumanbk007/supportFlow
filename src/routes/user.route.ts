import { Router } from "express";

import { UserRole } from "../../generated/prisma/enums.js";

import {
  createAgentController,
  deleteUserController,
  getUserByIdController,
  getUsersController,
  updateUserController,
} from "../controllers/user.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

import {
  createAgentSchema,
  updateUserSchema,
} from "../validations/user.validation.js";
import ROUTES from "../constants/routes.constant.js";
import { validate } from "../middleware/validations.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  authorize,
  authorizeUserUpdate,
} from "../middleware/authorization.middleware.js";

const router = Router();

router.post(
  ROUTES.USER_AGENTS,
  authenticate,
  authorize(UserRole.ADMIN),
  validate(createAgentSchema),
  asyncHandler(createAgentController),
);

router.get(ROUTES.USERS, authenticate, asyncHandler(getUsersController));

router.get(
  ROUTES.USER_BY_ID,
  authenticate,
  asyncHandler(getUserByIdController),
);

router.patch(
  ROUTES.USER_BY_ID,
  authenticate,
  authorizeUserUpdate,
  validate(updateUserSchema),
  asyncHandler(updateUserController),
);

router.delete(
  ROUTES.USER_BY_ID,
  authenticate,
  authorize(UserRole.ADMIN),
  asyncHandler(deleteUserController),
);

export default router;
