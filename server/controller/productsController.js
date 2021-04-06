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

// DESC => Delete Product By Id
// ROUTE => DELETE /api/products/:id
// SCCESS => Private/Admin
export const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.delete();

    res.status(200).send("Success");
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

// DESC => Add product
// ROUTE => POST /api/products
// ACCESS => Private/Admin
export const addProduct = asyncHandler(async (req, res) => {
  const newProduct = new Product({
    user: req.user._id,
    name: "Sample Product",
    image: "/images/sample.jpg",
    description: "Sample Description",
    brand: "SAMPLE BRAND",
    category: "SAMPLE CATEGORY",
    price: 0,
    countInStock: 0,
    numReviews: 0,
  });

  const product = await newProduct.save();
  res.status(201).json(product);
});

// DESC => Update Product by Id
// ROUTE => PUT /api/products/:id
// ACCESS => Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.image = image || product.image;
    product.description = description || product.description;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.price = price || product.price;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// DESC => Delete Product By Id
// ROUTE => DELETE /api/products/:id
// ACCESS => Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.status(200).send("Delete Successfully");
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
