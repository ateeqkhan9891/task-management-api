
import { Router } from "express";

import {
  createTask,
  getMyTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "./task.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createTask);

router.get("/", authMiddleware, getMyTasks);

router.get("/:id", authMiddleware, getTaskById);

router.patch("/:id", authMiddleware, updateTask);

router.delete("/:id", authMiddleware, deleteTask);

export default router;