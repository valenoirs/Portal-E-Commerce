import { Router } from "express";
import { Admin } from "../models/admin";
import { Product } from "../models/product";
import { Order } from "../models/order";
import { Request, Response } from "express";

export const router = Router();

router.get("/", async (req, res) => {
  if (!req.session.admin) return res.redirect("/signin");

  const { id } = req.session.admin;
  const admin = await Admin.findOne({ id });
  const product = await Product.find({ adminId: id });
  const order = await Order.find({ adminId: id });

  res.render("home", {
    layout: "layout",
    error: req.flash("error"),
    productNotification: req.flash("product"),
    adminNotification: req.flash("admin"),
    admin,
    order,
    product,
  });
});

router.get("/order", async (req: Request, res: Response) => {
  if (!req.session.admin) return res.redirect("/signin");
  res.render("order", { layout: "layout", error: req.flash("error") });
});

router.get("/signin", async (req, res) => {
  if (req.session.admin) return res.redirect("/");
  res.render("signin", { layout: "layout", error: req.flash("error") });
});

router.get("/signup", async (req, res) => {
  if (req.session.admin) return res.redirect("/");
  res.render("signup", { layout: "layout", error: req.flash("error") });
});
