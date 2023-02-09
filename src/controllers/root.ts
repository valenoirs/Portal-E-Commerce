import { Request, Response } from "express";
import { Root } from "../models/root";
import { IRoot } from "../interface/root";
import config from "../config/config";
import { Admin } from "../models/admin";
import { User } from "../models/user";

/**
 * Root Sign in controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const root = await Root.findOne({ email });

    // Check if email registered
    if (!root) {
      req.flash("root", "Email belum terdaftar.");
      console.log("[SERVER]: Email not registered");
      return res.redirect("/signin");
    }

    // Check if password match
    if (password !== root.password) {
      req.flash("root", "Password salah.");
      console.log("[SERVER]: Incorrect password");
      return res.redirect("/signin");
    }

    const { id, name } = root;

    // Create session
    const rootSession: Pick<IRoot, "id" | "name" | "email"> = {
      id,
      name,
      email,
    };

    req.session.root = rootSession;

    // Sign in success
    console.log("[SERVER]: Root logged in.");
    return res.redirect("/root/admin");
  } catch (error) {
    // Sign in error
    req.flash("root", "Terjadi kesalahan saat mencoba masuk, coba lagi.");
    console.error("[SERVER]: Sign in error.", error);
    return res.redirect("/root/signin");
  }
};

/**
 * Root Sign out controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const signOut = async (req: Request, res: Response) => {
  try {
    // Check if session id provided
    if (!req.session.root) {
      req.flash("root", "Terjadi kesalahan saat mencoba keluar, coba lagi.");
      console.log("[SERVER]: No session id provided.");
      return res.redirect("/");
    }

    const { email } = req.session.root;

    req.session.destroy((error: Error) => {
      if (error) throw error;

      res.clearCookie(config.SESSION_COLLECTION_NAME);

      // Sign out success
      console.log(`[SERVER]: ${email} signed out.`);
      return res.redirect("/");
    });
  } catch (error) {
    // Sign out error
    req.flash("root", "Terjadi kesalahan saat mencoba keluar, coba lagi.");
    console.error("[SERVER]: Sign out error.", error);
    return res.redirect("/");
  }
};

/**
 * Root Accesss delete admin controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const admin = await Admin.findById(id);

    if (!admin) {
      req.flash("root", "Toko tidak ditemukan.");
      console.error("[SERVER]: Admin not found.");
      return res.redirect("back");
    }

    await Admin.findByIdAndDelete(id);

    req.flash("root", "Toko berhasil dihapus.");
    console.error("[SERVER]: Admin deleted.");
    return res.redirect("back");
  } catch (error) {
    // Delete Admin Error
    req.flash(
      "root",
      "Terjadi kesalahan saat mencoba menghapus toko, coba lagi."
    );
    console.error("[SERVER]: Delete admin error.", error);
    return res.redirect("back");
  }
};

/**
 * Root Accesss delete user controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const user = await User.findById(id);

    if (!user) {
      req.flash("root", "Pengguna tidak ditemukan.");
      console.error("[SERVER]: User not found.");
      return res.redirect("back");
    }

    await User.findByIdAndDelete(id);

    req.flash("root", "Pengguna berhasil dihapus.");
    console.error("[SERVER]: User deleted.");
    return res.redirect("back");
  } catch (error) {
    // Delete User Error
    req.flash(
      "root",
      "Terjadi kesalahan saat mencoba menghapus pengguna, coba lagi."
    );
    console.error("[SERVER]: Delete user error.", error);
    return res.redirect("back");
  }
};

/**
 * Root Accesss update admin controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const user = await User.findById(id);

    if (!user) {
      req.flash("root", "Pengguna tidak ditemukan.");
      console.error("[SERVER]: User not found.");
      return res.redirect("back");
    }

    await User.findByIdAndUpdate(id, { $set: req.body });

    req.flash("root", "Pengguna berhasil diperbarui.");
    console.error("[SERVER]: User updated.");
    return res.redirect("back");
  } catch (error) {
    // Update User Error
    req.flash(
      "root",
      "Terjadi kesalahan saat mencoba memperbarui pengguna, coba lagi."
    );
    console.error("[SERVER]: Update user error.", error);
    return res.redirect("back");
  }
};
