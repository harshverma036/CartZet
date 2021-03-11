import express from "express";
const router = express.Router();
import {
  getProductsList,
  getProductById,
} from "../controller/productsController.js";

router.route("/").get(getProductsList);
router.route("/:id").get(getProductById);

export default router;
