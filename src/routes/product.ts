import { Router } from "express";
import * as product from "../controllers/product";

import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { storage } from "../middleware/multer";

// Multer Option
const multerOption = {
  fileFilter: function (
    req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
  ) {
    const ext = path.extname(file.originalname);
    if (ext !== ".png") {
      return callback(null, false);
    }
    callback(null, true);
  },
  storage,
};

const upload = multer(multerOption);

export const router = Router();

// Product Routing
router.post("/", upload.single("file"), product.createProduct);

router.put("/", upload.single("file"), product.updateProduct);

router.delete("/", product.deleteProduct);

// API
router.get("/", product.readProduct);
