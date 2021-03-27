import express from "express";
const router = express.Router();
import {
  userLogin,
  registerUser,
  getUserById,
  updateUserInfo,
  getAllUsers,
} from "../controller/userController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

router.route("/").get(protect, admin, getAllUsers);
router.route("/profile").get(protect, getUserById).put(protect, updateUserInfo);
router.route("/login").post(userLogin);
router.route("/register").post(registerUser);

export default router;
