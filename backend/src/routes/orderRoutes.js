import { Router } from "express";
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", protect, adminOnly, getOrders);
router.post("/", createOrder);
router.put("/:id", protect, adminOnly, updateOrder);
router.delete("/:id", protect, adminOnly, deleteOrder);

export default router;