import express from "express";
const router = express.Router();
import {
  getProductsList,
  getProductById,
  addProduct,
} from "../controller/productsController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

router.route("/").get(getProductsList).post(protect, admin, addProduct);
router.route("/:id").get(getProductById);

export default router;
