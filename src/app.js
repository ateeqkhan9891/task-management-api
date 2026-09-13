import express from "express";
import cors from "./config/cors.js";
import healthCheck from "./routes/health.routes.js";

import helmet from "helmet";
import apiRateLimit from "./config/rateLimit.js";

import authRoutes from "./auth/auth.routes.js";
import userRoutes from "./users/user.routes.js";
import adminRoutes from "./admin/admin.routes.js";

import taskRoutes from "./tasks/task.routes.js";

import projectRoutes from "./projects/project.routes.js";

import notFoundMiddleware from "./middleware/notFound.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());
app.use(cors);
app.use(apiRateLimit);
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/health", healthCheck);


app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;