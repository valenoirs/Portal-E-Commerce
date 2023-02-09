import { Router } from "express";
import * as root from "../controllers/root";
import { Admin } from "../models/admin";
import { User } from "../models/user";

export const router = Router();

// POST
router.post("/", root.signIn);
router.get("/signout", root.signOut);

// Admin
// router.patch("/admin"); // Unused
router.delete("/admin", root.deleteAdmin);

// User
router.patch("/user", root.updateUser);
router.delete("/user", root.deleteUser);

// GET
router.get("/", async (req, res) => {
  if (!req.session.root) return res.redirect("/root/signin");
});

router.get("/admin", async (req, res) => {
  if (!req.session.root) return res.redirect("/root/signin");

  const admins = await Admin.find();

  return res.render("root/admin", {
    layout: "layout",
    error: req.flash("error"),
    rootNotification: req.flash("root"),
    admins,
  });
});

router.get("/user", async (req, res) => {
  if (!req.session.root) return res.redirect("/root/signin");

  const users = await User.find();

  return res.render("root/user", {
    layout: "layout",
    error: req.flash("error"),
    rootNotification: req.flash("root"),
    users,
  });
});

router.get("/signin", async (req, res) => {
  if (req.session.root) return res.redirect("/root");

  return res.render("root/signin", {
    layout: "layout",
    error: req.flash("error"),
    rootNotification: req.flash("root"),
  });
});
