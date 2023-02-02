import { Router, Request, Response } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

const routes = Router();

routes.post(
  "/posts",
  multer(multerConfig).single("file"),
  (req: Request, res: Response) => {
    console.log(req.file);
    return res.send({ Hello: "World" });
  }
);

export default routes;
