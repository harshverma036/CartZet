import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => res.send("API is running..."));

app.use(errorHandler);

const PORT = 5000 || process.env.PORT;

app.listen(
  PORT,
  console.log(`Server is running in ENV on PORT: ${PORT}`.yellow.underline.bold)
);
