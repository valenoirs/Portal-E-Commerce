import { model, Schema } from "mongoose";
import { IRoot } from "../interface/root";

const RootSchema: Schema = new Schema<IRoot>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Root = model<IRoot>("Root", RootSchema);
