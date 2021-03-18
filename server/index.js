import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import productRouter from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("API is running..."));

app.use("/api/products", productRouter);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(errorHandler);

const PORT = 5000 || process.env.PORT;

app.listen(
  PORT,
  console.log(`Server is running in ENV on PORT: ${PORT}`.yellow.underline.bold)
);
