import User from "../models/UsersModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

// DESC => Login auth user
// ROUTE => POST /api/users/login
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
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password!");
  }
});

// DESC => Register and auth user
// ROUTE => POST /api/users/register
// ACCESS => Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(401);
    throw new Error("User already exists!");
  }

  const newUser = new User({
    name,
    email,
    password,
  });

  const user = await newUser.save();

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Error occured");
  }
});

// DESC => Get user by id
// ROUTE => GET /api/users/:id
// ACCESS => Private
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
  }
});
