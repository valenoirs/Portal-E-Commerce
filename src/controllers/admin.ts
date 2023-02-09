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
      req.flash("error", "Email belum terdaftar.");
      console.log("[SERVER]: Email not registered");
      return res.redirect("/signin");
    }

    // Check if password match
    if (password !== admin.password) {
      req.flash("error", "Password salah.");
      console.log("[SERVER]: Incorrect password");
      return res.redirect("/signin");
    }

    const { id, name, isOpen } = admin;

    // Create session
    const adminSession: Pick<IAdmin, "id" | "name" | "email" | "isOpen"> = {
      id,
      name,
      email,
      isOpen,
    };

    req.session.admin = adminSession;

    // Sign in success
    console.log("[SERVER]: Admin logged in.");
    return res.redirect("/");
  } catch (error) {
    // Sign in error
    req.flash("error", "Terjadi kesalahan saat mencoba masuk, coba lagi.");
    console.error("[SERVER]: Sign in error.", error);
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
      req.flash("error", "Email sudah terdaftar sebagai admin.");
      console.log("[SERVER]: Email already existed.");
      return res.redirect("/signup");
    }

    // Check if phone already registered
    if (admin && (admin as IAdmin).phone === phone) {
      req.flash("error", "Nomor HP sudah terdaftar sebagai admin.");
      console.log("[SERVER]: Phone already existed.");
      return res.redirect("/signup");
    }

    const { password, passwordConfirmation } = req.body;

    // Check if password char less than 8
    if (password.length < 8) {
      req.flash("error", "Password harus lebih dari 8 karakter.");
      console.log("[SERVER]: Password length less than 8.");
      return res.redirect("/signup");
    }

    // Check if password is correct
    if (password !== passwordConfirmation) {
      req.flash("error", "Konfirmasi Password gagal.");
      console.log("[SERVER]: Password Confirmation failed.");
      return res.redirect("/signup");
    }

    req.body.certificatePIRT = `/upload/certificate/${pirtCertificate.filename}`;

    req.body.certificateHalal = `/upload/certificate/${halalCertificate.filename}`;

    delete req.body.passwordConfirmation;

    // Save new admin to database
    await new Admin(req.body).save();

    // Sign up success
    console.log("[SERVER]: New Admin added");
    req.flash(
      "error",
      "Akun berhasil didaftarkan, silahkan masuk untuk melanjutkan."
    );
    return res.redirect("/signin");
  } catch (error) {
    // Sign up error
    req.flash(
      "error",
      "Terjadi kesalahan saat melakukan pendaftaran, coba lagi."
    );
    console.error("[SERVER]: Sign up error.", error);
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
      req.flash("error", "Terjadi kesalahan saat mencoba keluar, coba lagi.");
      console.log("[SERVER]: No session id provided.");
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
    req.flash("error", "Terjadi kesalahan saat mencoba keluar, coba lagi.");
    console.error("[SERVER]: Sign out error.", error);
    return res.redirect("/");
  }
};

/**
 * Admin Update controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const updateAdmin = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { id } = req.session.admin;

    if (req.query.updateToko) {
      let isOpen = true;
      let notification = "Toko dibuka.";

      if (req.body.isOpen === "true") {
        isOpen = false;
        notification = "Toko ditutup.";
      }

      await Admin.findByIdAndUpdate(id, { $set: { isOpen } });

      req.session.admin.isOpen = isOpen;

      console.log("BUKA TOKO");

      req.flash("admin", notification);
      console.log("[SERVER]: Toko information updated.");
      return res.redirect("/");
    }

    await Admin.findByIdAndUpdate(id, { $set: req.body });

    req.flash("admin", "Informasi Toko berhasil diperbarui.");
    console.log("[SERVER]: Admin information updated.");
    return res.redirect("/");
  } catch (error) {
    req.flash("admin", "Informasi Toko gagal diperbarui, coba lagi.");
    console.error("[SERVER]: Admin/Toko information update error.");
    return res.redirect("/");
  }
};

/**
 * Get all Admin controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const readAdmin = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    let admin;

    search
      ? (admin = await Admin.find({ name: { $regex: search, $options: "i" } }))
      : (admin = await Admin.find());

    // const admin = await Admin.find()

    return res.status(200).send({
      success: true,
      status: 200,
      data: {
        admin,
      },
    });
  } catch (error) {
    return res.status(500).send({
      error: true,
      status: 500,
      type: "GetAdminError",
      data: {
        message:
          "Something went wrong while getting admin data, please try again.",
      },
    });
  }
};
