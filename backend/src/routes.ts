import { Router, Request, Response } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import Post from "./models/post";

const routes = Router();

routes.post(
  "/posts",
  multer(multerConfig).single("file"),
  async (req: Request, res: Response) => {
    const post = await Post.create({
      name: req.file?.originalname,
      size: req.file?.size,
      key: req.file?.filename,
      url: "",
    });

    return res.send(post);
  }
);

export default routes;
