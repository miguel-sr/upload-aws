import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";

import routes from "./routes";

const app = express();

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/upload-aws").then(() => {
  console.log("==> MongoDB Connected");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(routes);

app.listen(3000, () => {
  console.log("==> Server running");
});
