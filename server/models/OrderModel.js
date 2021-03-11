import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        product: {
          type: mongoose.Schema.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    taxPrice: {
      type: Number,
      required: true,
    },
    shippingPrice: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      address: { type: String, required: true },
      state: { type: String, required: true },
      pinCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentDetails: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDelivered: { type: Boolean, required: true, default: false },
    paidAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
