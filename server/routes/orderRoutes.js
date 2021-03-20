import express from "express";
const router = express.Router();
import { addNewOrder, getOrderById } from "../controller/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

router.route("/").post(protect, addNewOrder);
router.route("/:id").get(protect, getOrderById);

export default router;
