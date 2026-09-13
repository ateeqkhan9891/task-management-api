import express from "express";
import healthCheck from "./routes/health.routes.js";

import authRoutes from "./auth/auth.routes.js";
import userRoutes from "./users/user.routes.js";

import projectRoutes from "./projects/project.routes.js";

import notFoundMiddleware from "./middleware/notFound.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/health", healthCheck);


app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;