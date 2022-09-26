import { Request, Response } from "express";
import path from "path";
import { IAdmin } from "../interface/admin";
import { Admin } from "../models/admin";
import config from "../config/config";

/**
 * Admin Sign in controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    // Check if email registered
    if (!admin) {
      console.log("[SERVER]: Email not registered");
      req.flash("error", "Email belum terdaftar.");
      return res.redirect("/signin");
    }

    // Check if password match
    if (password !== admin.password) {
      console.log("[SERVER]: Incorrect password");
      req.flash("error", "Password salah.");
      return res.redirect("/signin");
    }

    const { id } = admin;

    // Create session
    const adminSession = {
      id,
      email,
    };

    req.session.admin = adminSession;

    // Sign in success
    console.log("[SERVER]: Admin logged in.");
    return res.redirect("/");
  } catch (error) {
    // Sign in error
    console.error("[SERVER]: Sign in error.", error);
    req.flash("error", "Terjadi kesalahan saat mencoba masuk, coba lagi.");
    return res.redirect("/signin");
  }
};

/**
 * Admin Sign up controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const signUp = async (req: Request, res: Response) => {
  try {
    const pirtCertificate = (req as any).files.pirt[0];
    const halalCertificate = (req as any).files.halal[0];
    const { email, phone } = req.body;

    const admin = await Admin.findOne({ email });

    // Check if email already registered
    if (admin) {
      console.log("[SERVER]: Email already existed.");
      req.flash("error", "Email sudah terdaftar sebagai admin.");
      return res.redirect("/signup");
    }

    // Check if phone already registered
    if (admin && (admin as IAdmin).phone === phone) {
      console.log("[SERVER]: Phone already existed.");
      req.flash("error", "Nomor HP sudah terdaftar sebagai admin.");
      return res.redirect("/signup");
    }

    const { password, passwordConfirmation } = req.body;

    // Check if password char less than 8
    if (password.length < 8) {
      console.log("[SERVER]: Password length less than 8.");
      req.flash("error", "Password harus lebih dari 8 karakter.");
      return res.redirect("/signup");
    }

    // Check if password is correct
    if (password !== passwordConfirmation) {
      console.log("[SERVER]: Password Confirmation failed.");
      req.flash("error", "Konfirmasi Password gagal.");
      return res.redirect("/signup");
    }

    req.body.certificatePIRT = path.join(
      __dirname,
      `../public/upload/sertifikat/${pirtCertificate.filename}`
    );

    req.body.certificateHalal = path.join(
      __dirname,
      `../public/upload/sertifikat/${halalCertificate.filename}`
    );

    delete req.body.passwordConfirmation;

    console.log(req.body);

    // Save new admin to database
    await new Admin(req.body).save();

    // Sign up success
    console.log("[SERVER]: New Admin added");
    return res.redirect("/signin");
  } catch (error) {
    // Sign up error
    console.error("[SERVER]: Sign up error.", error);
    req.flash(
      "error",
      "Terjadi kesalahan saat melakukan pendaftaran, coba lagi."
    );
    return res.redirect("/signup");
  }
};

/**
 * Admin Sign out controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const signOut = async (req: Request, res: Response) => {
  try {
    // Check if session id provided
    if (!req.session.admin) {
      console.log("[SERVER]: No session id provided.");
      req.flash("error", "Terjadi kesalahan saat mencoba keluar, coba lagi.");
      return res.redirect("/");
    }

    const { email } = req.session.admin;

    req.session.destroy((error: Error) => {
      if (error) throw error;

      res.clearCookie(config.SESSION_COLLECTION_NAME);

      // Sign out success
      console.log(`[SERVER]: ${email} signed out.`);
      return res.redirect("/");
    });
  } catch (error) {
    // Sign out error
    console.error("[SERVER]: Sign out error.", error);
    req.flash("error", "Terjadi kesalahan saat mencoba keluar, coba lagi.");
    return res.redirect("/");
  }
};
