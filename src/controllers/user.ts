import { Request, Response } from "express";
import { User } from "../models/user";

/**
 * User sign in controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(300).send({
        error: true,
        status: 300,
        type: "UserNotRegistered",
        message: "Akun belum terdaftar, silahkan daftar dulu ya.",
      });
    }

    if (password !== user.password) {
      return res.status(300).send({
        error: true,
        status: 300,
        type: "IncorrectPassword",
        message: "Password yang dimasukkan salah, silahkan coba lagi.",
      });
    }

    const { name, phone, id } = user;

    return res.status(200).send({
      success: true,
      status: 200,
      message: "Login berhasil.",
      user: { name, phone, email, id },
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
 * User sign up controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, phone } = req.body;

    const user = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });

    if (user) {
      return res.status(400).send({
        error: true,
        status: 400,
        type: "EmailOrPhoneAlreadyRegistered",
        message: "Maaf, email atau nomor telepon sudah terdaftar.",
      });
    }

    const { password, passwordConfirmation } = req.body;

    if (password !== passwordConfirmation)
      return res.status(400).send({
        error: true,
        status: 400,
        type: "PasswordConfirmationError",
        message: "Maaf, konfirmasi password gagal",
      });

    delete req.body.passwordConfirmation;

    await new User(req.body).save();

    console.log("New user created.");

    return res.status(200).send({
      success: true,
      status: 200,
      message: "Akun berhasil didaftarkan, silahkan Login untuk melanjutkan.",
    });
  } catch (error) {
    console.error("[ERROR]: User sign up failed\n", error);
    return res.status(500).send({
      error: true,
      status: 503,
      type: "ServerError",
      message: "Terjadi kesalahan pada server, mohon coba lagi.",
    });
  }
};

/**
 * User sign out controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const signout = async (req: Request, res: Response) => {
  try {
    return;
  } catch (error) {
    return;
  }
};
