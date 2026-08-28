import { Router } from "express";

import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import { loginSchema, registerSchema } from "../validations/auth.validation.js";
import ROUTES from "../constants/routes.constant.js";
import { validate } from "../middleware/validations.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const router = Router();

router.post(
  ROUTES.AUTH_REGISTER,
  validate(registerSchema),
  asyncHandler(registerController),
);

router.post(
  ROUTES.AUTH_LOGIN,
  validate(loginSchema),
  asyncHandler(loginController),
);
export default router;
