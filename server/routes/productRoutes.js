import express from "express";
const router = express.Router();
import {
  getProductsList,
  getProductById,
  addProduct,
  updateProduct,
} from "../controller/productsController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

router.route("/").get(getProductsList).post(protect, admin, addProduct);
router.route("/:id").get(getProductById).put(protect, admin, updateProduct);

export default router;
