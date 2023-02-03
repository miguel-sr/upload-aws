import multer, { Options } from "multer";
import path from "path";
import crypto from "crypto";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import awsConnectParams from "./aws-connect-params";

enum MulterStorageTypes {
  s3 = "s3",
  local = "local",
}

let STORAGE_TYPE: MulterStorageTypes = MulterStorageTypes.local;

switch (process.env.STORAGE_TYPE) {
  case MulterStorageTypes.s3:
    STORAGE_TYPE = MulterStorageTypes.s3;
    break;

  case MulterStorageTypes.local:
    STORAGE_TYPE = MulterStorageTypes.local;
    break;
}

interface MulterFile extends Express.MulterS3.File, Express.Multer.File {}

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (req, file: MulterFile, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, "");

        file.key = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, file.key);
      });
    },
  }),
  s3: multerS3({
    s3: new S3Client({
      region: process.env.AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: awsConnectParams.AWS_ACCESS_KEY_ID,
        secretAccessKey: awsConnectParams.AWS_SECRET_ACCESS_KEY,
      },
    }),
    bucket: awsConnectParams.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, "");

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
};

export default <Options>{
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes[STORAGE_TYPE],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      try {
        cb(null, true);
      } catch (error) {
        throw new Error("Image is too large.");
      }
    } else {
      cb(new Error("Invalid file type."));
    }
  },
};
