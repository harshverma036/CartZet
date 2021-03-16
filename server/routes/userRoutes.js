import express from "express";
const router = express.Router();
import {
  userLogin,
  registerUser,
  getUserById,
} from "../controller/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

router.route("/profile").get(protect, getUserById);
router.route("/login").post(userLogin);
router.route("/register").post(registerUser);

export default router;
