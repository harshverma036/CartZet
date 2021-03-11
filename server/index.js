import express from "express";
import colors from "colors";

const app = express();

app.get("/", (req, res) => res.send("API is running..."));

const PORT = 5000 || process.env.PORT;
app.listen(
  PORT,
  console.log(`Server is running in ENV on PORT: ${PORT}`.yellow.underline.bold)
);
