import awsConnectParams from "../config/aws-connect-params";
import fs from "fs";
import path from "path";
import { promisify } from "util";

import { S3 } from "aws-sdk";
const s3 = new S3({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: awsConnectParams.AWS_ACCESS_KEY_ID,
    secretAccessKey: awsConnectParams.AWS_SECRET_ACCESS_KEY,
  },
});

export function removeFile(Key: string) {
  if (process.env.STORAGE_TYPE === "s3") {
    const Bucket = process.env.AWS_BUCKET;

    if (!Bucket) {
      throw new Error("Missing AWS Bucket.");
    }

    return s3
      .deleteObject(
        {
          Bucket,
          Key,
        },
        function (err) {
          err ? console.log(err) : console.log("File is deleted from S3");
        }
      )
      .promise();
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, "..", "..", "tmp", "uploads", Key)
    );
  }
}
