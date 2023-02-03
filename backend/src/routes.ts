import { Router, Request, Response } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import Post from "./models/post";
import { removeFile } from "./utils/remove-file";

const routes = Router();

const upload = multer(multerConfig).single("file");

interface MulterFile extends Express.MulterS3.File, Express.Multer.File {}

routes.get("/posts", async (req: Request, res: Response) => {
  const posts = await Post.find();
  return res.json(posts);
});

routes.post("/posts", (req: Request, res: Response) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send(err);
    } else if (err) {
      return res.status(400).send(err);
    }

    if (!req.file) {
      return res.sendStatus(400);
    }

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
  });
});

routes.delete("/posts/:id", async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id);

  if (!post?.key) {
    throw new Error("Missing Object Key.");
  }

  removeFile(post?.key);
  post?.remove();
  return res.json(post);
});

export default routes;
