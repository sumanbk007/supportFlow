import bcrypt from "bcryptjs";

import { prisma } from "../config/database.js";
import { AppError } from "../utils/app.error.js";

interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

const userSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} as const;

export const getUsers = async () => {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: userSelect,
  });
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: userSelect,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const updateUser = async (id: string, input: UpdateUserInput) => {
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  if (input.email && input.email !== existingUser.email) {
    const emailExists = await prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (emailExists) {
      throw new AppError("A user with this email already exists", 409);
    }
  }

  const data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    passwordHash?: string;
  } = {};

  if (input.firstName !== undefined) {
    data.firstName = input.firstName;
  }

  if (input.lastName !== undefined) {
    data.lastName = input.lastName;
  }

  if (input.email !== undefined) {
    data.email = input.email;
  }

  if (input.password !== undefined) {
    data.passwordHash = await bcrypt.hash(input.password, 12);
  }

  return prisma.user.update({
    where: { id },
    data,
    select: userSelect,
  });
};

export const deleteUser = async (id: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  await prisma.user.delete({
    where: { id },
  });
};
