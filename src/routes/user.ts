import { Router } from "express";
import * as user from "../controllers/user";

export const router = Router();

router.post("/signin", user.signin);

router.post("/signup", user.signup);
