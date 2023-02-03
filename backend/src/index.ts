import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";

import routes from "./routes";

const app = express();

if (!process.env.MONGO_URL) {
  throw new Error("Missing Mongo URL");
}

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("==> MongoDB Connected");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.use(routes);

app.listen(8089, () => {
  console.log("==> Server running");
});
