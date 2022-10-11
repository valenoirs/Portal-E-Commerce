import { model, Schema } from "mongoose";
import { IProduct } from "../interface/product";

const ProductSchema: Schema = new Schema<IProduct>(
  {
    adminId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    picture: { type: String, required: true },
    available: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

export const Product = model<IProduct>("Product", ProductSchema);
