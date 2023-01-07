import { Request, Response } from "express";
import { Order } from "../models/order";
import { nanoid } from "nanoid";
import { Admin } from "../models/admin";

/**
 * Create Order controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { isCOD } = req.body;

    if (isCOD) {
      req.body.status = "Pesanan Diproses";
    }

    req.body.invoiceId = `#${nanoid(10)}`;

    await new Order(req.body).save();

    return res.status(200).send({
      success: true,
      status: 200,
      message: "Pesanan berhasil dibuat.",
    });
  } catch (error) {
    console.error("[ERROR]: User sign up failed\n", error);
    return res.status(503).send({
      error: true,
      status: 503,
      type: "ServerError",
      message: "Terjadi kesalahan pada server, mohon coba lagi.",
    });
  }
};

/**
 * Get all Order controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const userGetAllOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    const order = await Order.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      status: 200,
      data: {
        order,
      },
    });
  } catch (error) {
    console.error("[ERROR]: Get user order error.\n", error);
    return res.status(500).send({
      error: true,
      status: 503,
      type: "ServerError",
      message: "Terjadi kesalahan pada server, mohon coba lagi.",
    });
  }
};

/**
 * Update Status Order controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status, id } = req.body;
    const { productId } = req.query;

    if (productId) {
      await Order.findByIdAndUpdate(productId, { $set: { status } });

      console.log(productId, status);

      console.log("Order status updated");
      req.flash(
        "product",
        `Status pesanan berhasil diperbarui ke <i>${status}</i>`
      );
      return res.redirect("/");
    }

    await Order.findByIdAndUpdate(id, { $set: { status } });

    console.log("Order status updated");
    return res.status(200).send({
      success: true,
      status: 200,
    });
  } catch (error) {
    console.error("[ERROR]: Update Order status error.\n", error);
    return res.status(500).send({
      error: true,
      status: 503,
      type: "ServerError",
      message: "Terjadi kesalahan pada server, mohon coba lagi.",
    });
  }
};

/**
 * Update Order Rating controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const ratingOrder = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { orderId, adminId, rating } = req.body;

    const admin = await Admin.findById(adminId);

    console.log(admin);

    // Update Admin Rating
    if (admin) {
      admin.rating.push(rating);

      const totalRating = admin.rating.reduce((a, b) => a + b);

      const rated = totalRating / admin.rating.length;

      admin.rated = rated.toString().slice(0, 3);

      console.log(admin.rated);

      await admin.save();
    }

    await Order.findByIdAndUpdate(orderId, {
      $set: { isRated: true, rated: rating },
    });

    console.log("[SERVER]: Rating updated");
    return res.status(200).send({
      success: true,
      status: 200,
      message: "Penilaian disimpan, terima kasih.",
    });
  } catch (error) {
    console.error("[ERROR]: Update Order rating error.\n", error);
    return res.status(500).send({
      error: true,
      status: 503,
      type: "ServerError",
      message: "Terjadi kesalahan pada server, mohon coba lagi.",
    });
  }
};
