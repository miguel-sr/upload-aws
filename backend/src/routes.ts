import { Router, Request, Response } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import Post from "./models/post";

const routes = Router();

interface MulterFile extends Express.MulterS3.File, Express.Multer.File {}

routes.post(
  "/posts",
  multer(multerConfig).single("file"),
  async (req: Request, res: Response) => {
    const {
      originalname: name,
      size,
      location: url,
      key,
    } = req.file as MulterFile;
    const post = await Post.create({
      name,
      size,
      url,
      key,
    });
    return res.send(post);
  }
);

export default routes;
