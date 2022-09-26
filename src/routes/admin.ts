import { Router } from "express";
import * as admin from "../controllers/admin";
import { upload } from "../middleware/multer";

export const router = Router();

router.post("/signin", admin.signIn);

router.post(
  "/signup",
  upload.fields([
    { name: "pirt", maxCount: 1 },
    { name: "halal", maxCount: 1 },
  ]),
  admin.signUp
);

router.get("/signout", admin.signOut);
