import express from "express";
const router = express.Router();
import { addNewOrder } from "../controller/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

router.route("/").post(protect, addNewOrder);

export default router;
