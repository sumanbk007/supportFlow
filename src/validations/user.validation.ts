import { z } from "zod";

export const updateUserSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name cannot be empty")
      .optional(),

    lastName: z.string().trim().min(1, "Last name cannot be empty").optional(),

    email: z.email("Invalid email address").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export const createAgentSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),

  lastName: z.string().trim().min(1, "Last name is required"),

  email: z.email("Invalid email address"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});
