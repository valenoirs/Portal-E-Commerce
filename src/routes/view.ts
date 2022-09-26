import { Router } from "express";

export const router = Router();

router.get("/", async (req, res) => {
  if (!req.session.admin) return res.redirect("/signin");
  res.render("home", { layout: "layout", error: req.flash("error") });
});

router.get("/signin", async (req, res) => {
  res.render("signin", { layout: "layout", error: req.flash("error") });
});

router.get("/signup", async (req, res) => {
  res.render("signup", { layout: "layout", error: req.flash("error") });
});
