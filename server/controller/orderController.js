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

// DESC => Update delivery status by order id
// ROUTE => PUT /api/orders/:id
// ACCESS => Private
export const updateDeliveryStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedDelivery = await order.save();
    res.json(updatedDelivery);
  } else {
    res.status(401);
    throw new Error("Order not found.");
  }
});

// DESC => Get order list of user by id
// ROUTE => GET /api/orders
// ACCESS => Private
export const getOrdersListById = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(401);
    throw new Error("No orders found!");
  }
});

// DESC => Get all orders
// ROUTE => GET /api/orders/all
// ACCESS => Private/Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "name email");

  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404);
    throw new Error("No orders found");
  }
});

// DESC => Update payment details
// ROUTE => PUT /api/orders/:id/payment
// ACCESS => Private
export const updatePayment = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentDetails = {
      id: req.user._id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedPayment = await order.save();

    res.status(200).json(updatedPayment);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
