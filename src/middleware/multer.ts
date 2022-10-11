import { Request } from "express";
import { mkdirSync } from "fs";
import multer, { FileFilterCallback } from "multer";
import path from "path";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ) {
    let dir: string;
    if (req.session.admin) {
      dir = path.join(__dirname, "../public/upload/product");
    } else {
      dir = path.join(__dirname, "../public/upload/sertifikat");
    }

    try {
      mkdirSync(dir);
    } catch (error) {
      console.log("[server] ERR! directory-already-existed");
    }

    callback(null, dir);
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});
