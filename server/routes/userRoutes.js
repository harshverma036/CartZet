import express from "express";
const router = express.Router();
import {
  userLogin,
  registerUser,
  getUserLoginInfo,
  updateUserInfo,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controller/userController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

router.route("/").get(protect, admin, getAllUsers);
router
  .route("/:id")
  .get(protect, getUserById)
  .put(protect, admin, updateUserById);
router
  .route("/profile")
  .get(protect, getUserLoginInfo)
  .put(protect, updateUserInfo);
router.route("/login").post(userLogin);
router.route("/register").post(registerUser);

export default router;
