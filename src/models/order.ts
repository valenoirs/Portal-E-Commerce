import { model, Schema } from "mongoose";
import { IOrder, IOrderProduct } from "../interface/order";

const OrderSchema: Schema = new Schema<IOrder>(
  {
    adminId: { type: String, required: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    adminName: { type: String, required: true },
    product: { type: Array<IOrderProduct>, required: true },
    totalPayment: { type: Number, required: true },
    status: { type: String, required: true },
    note: { type: String, required: true },
    paymentProof: { type: String, reuqired: true, default: "" },
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrder>("Order", OrderSchema);
