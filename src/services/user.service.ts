import bcrypt from "bcryptjs";

import { UserRole } from "../../generated/prisma/enums.js";

import { prisma } from "../config/database.js";
import { AppError } from "../utils/app.error.js";

interface CreateAgentInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  email?: string;
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
    where: {
      deletedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: userSelect,
  });
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
      deletedAt: null,
    },
    select: userSelect,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const updateUser = async (id: string, input: UpdateUserInput) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });

  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  if (input.email && input.email !== existingUser.email) {
    const emailExists = await prisma.user.findFirst({
      where: {
        email: input.email,
        deletedAt: null,
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

  return prisma.user.update({
    where: {
      id,
    },
    data,
    select: userSelect,
  });
};

export const deleteUser = async (id: string) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });

  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};

export const createAgent = async (data: CreateAgentInput) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new AppError("A user with this email already exists", 409);
  }

  const passwordHash = await bcrypt.hash(data.password, 12);

  return prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      passwordHash,
      role: UserRole.AGENT,
    },
    select: userSelect,
  });
};
