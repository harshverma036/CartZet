import mongoose from "mongoose";
import colors from "colors";
import Product from "./models/ProductsModel.js";
import User from "./models/UsersModel.js";
import Order from "./models/OrderModel.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import ProductsData from "./data/products.js";
import UsersData from "./data/Users.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    const createdUser = await User.insertMany(UsersData);

    const adminUser = createdUser[0]._id;

    const sampleProduct = ProductsData.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProduct);
    console.log("Product imported!".blue.inverse.bold);
    process.exit();
  } catch (error) {
    console.log(`Import Error: ${error.message}`.red.inverse.bold);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    console.log("Data destroyed!".blue.inverse.bold);
  } catch (error) {
    console.log(`Desroy Error: ${error.message}`.red.inverse.bold);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
