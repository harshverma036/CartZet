import express from "express";
const router = express.Router();
import {
  addNewOrder,
  getOrderById,
  updateDeliveryStatus,
} from "../controller/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

router.route("/").post(protect, addNewOrder);
router
  .route("/:id")
  .get(protect, getOrderById)
  .put(protect, updateDeliveryStatus);

export default router;
