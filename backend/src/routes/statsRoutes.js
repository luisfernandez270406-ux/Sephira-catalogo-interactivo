import { Router } from "express";
import { getStats } from "../controllers/statsController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", protect, adminOnly, getStats);

export default router;