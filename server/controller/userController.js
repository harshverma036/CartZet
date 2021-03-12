import User from "../models/UsersModel.js";
import asyncHandler from "express-async-handler";

// DESC => Login auth user
// ROUTE => /api/users/login
// ACCESS => Public
export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.verifyPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password!");
  }
});
