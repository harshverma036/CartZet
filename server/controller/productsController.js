import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Product from "../models/ProductsModel.js";

// DESC => Get all products
// ROUTE => GET /api/products
// ACCESS => Public
export const getProductsList = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// DESC => Get product by Id
// ROUTE => GET /api/products/:id
// ACCESS => Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.json(product);
});
