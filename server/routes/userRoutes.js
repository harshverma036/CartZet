import express from "express";
import { userLogin } from "../controller/userController.js";
const router = express.Router();

router.route("/login").post(userLogin);

export default router;
