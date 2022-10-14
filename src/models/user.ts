import { model, Schema } from "mongoose";
import { IUser } from "../interface/user";

const UserSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", UserSchema);
