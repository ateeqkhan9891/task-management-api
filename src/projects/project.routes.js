
import { Router } from "express";
import {
  createProject,
  getMyProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "./project.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getMyProjects);
router.get("/:id", authMiddleware, getProjectById);
router.patch("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);

export default router;