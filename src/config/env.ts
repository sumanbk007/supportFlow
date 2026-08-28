import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || "5000",

  DATABASE_URL: process.env.DATABASE_URL as string,

  JWT_SECRET: process.env.JWT_SECRET as string,
  FRONTEND_URL: process.env.FRONTEND_URL as string,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
};
