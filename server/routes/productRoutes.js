import express from "express";
const router = express.Router();
import {
  getProductsList,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  createReview,
} from "../controller/productsController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

router.route("/").get(getProductsList).post(protect, admin, addProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route("/:id/review").post(protect, createReview);

export default router;
