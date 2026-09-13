import { Router } from "express";

import { listUsers, getStats } from "./admin.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = Router();

// All admin routes require authentication AND the ADMIN role
router.get("/users", authMiddleware, adminMiddleware, listUsers);
router.get("/stats", authMiddleware, adminMiddleware, getStats);

export default router;