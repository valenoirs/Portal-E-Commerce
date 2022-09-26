import { model, Schema } from "mongoose";
import { IOrder, IOrderProduct } from "../interface/order";

const OrderSchema: Schema = new Schema<IOrder>(
  {
    adminId: { type: String, required: true },
    userId: { type: String, required: true },
    product: { type: Array<IOrderProduct>, required: true },
    orderTotal: { type: Number, required: true },
    status: { type: String, required: true },
    payment: { type: String, reuqired: true, default: "" },
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrder>("Order", OrderSchema);
