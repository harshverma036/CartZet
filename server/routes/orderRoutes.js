import express from "express";
const router = express.Router();
import {
  addNewOrder,
  getOrderById,
  updateDeliveryStatus,
  getOrdersListById,
  getAllOrders,
  updatePayment,
} from "../controller/orderController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

router.route("/").post(protect, addNewOrder).get(protect, getOrdersListById);
router.route("/all").get(protect, admin, getAllOrders);
router
  .route("/:id")
  .get(protect, getOrderById)
  .put(protect, updateDeliveryStatus);
router.put("/:id/payment", protect, updatePayment);

export default router;
