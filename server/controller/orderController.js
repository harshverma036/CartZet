import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Order from "../models/OrderModel.js";

// DESC => Save new order
// ROUTE => POST /api/orders
// ACCESS => Public
export const addNewOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    totalPrice,
    taxPrice,
    shippingPrice,
    shippingAddress,
    paymentMethod,
    itemsPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(401);
    throw new Error("No items.");
  } else {
    const newOrder = new Order({
      user: req.user._id,
      orderItems,
      totalPrice,
      taxPrice,
      shippingPrice,
      shippingAddress,
      paymentMethod,
      itemsPrice,
    });

    const order = await newOrder.save();
    res.status(201).json(order);
  }
});

// DESC => Get order by Id
// ROUTE => GET /api/orders/:id
// ACCESS => Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found.");
  }
});
