import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.routes.js";

import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(cors({ origin: env.FRONTEND_URL }));

app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    message: "Support Flow Api",
  });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use(errorMiddleware);

export default app;
