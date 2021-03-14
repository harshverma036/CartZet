import express from "express";
import { userLogin, registerUser } from "../controller/userController.js";
const router = express.Router();

router.route("/login").post(userLogin);
router.route("/register").post(registerUser);

export default router;
