import express from "express";
const router = express.Router();
import {
  addNewOrder,
  getOrderById,
  updateDeliveryStatus,
  getOrdersListById,
} from "../controller/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

router.route("/").post(protect, addNewOrder).get(protect, getOrdersListById);
router
  .route("/:id")
  .get(protect, getOrderById)
  .put(protect, updateDeliveryStatus);

export default router;
