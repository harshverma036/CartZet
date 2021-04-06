import express from "express";
import path from "path";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import productRouter from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import UploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use("/uploads", express.static(path.join(path.resolve(), "/uploads")));

app.get("/", (req, res) => res.send("API is running..."));

app.use("/api/products", productRouter);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", UploadRoutes);

app.use(errorHandler);

const PORT = 5000 || process.env.PORT;

app.listen(
  PORT,
  console.log(`Server is running in ENV on PORT: ${PORT}`.yellow.underline.bold)
);
