import { model, Schema } from "mongoose";
import { IOrder, IOrderProduct } from "../interface/order";

const OrderProductSchema: Schema = new Schema<IOrderProduct>({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  picture: { type: String, required: true },
  productTotal: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema<IOrder>(
  {
    invoiceId: { type: String, required: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userPhone: { type: String, required: true },
    adminPhone: { type: String, required: true },
    adminId: { type: String, required: true },
    adminName: { type: String, required: true },
    product: { type: [OrderProductSchema], required: true, default: [] },
    totalPayment: { type: Number, required: true },
    status: { type: String, required: true, default: "Menunggu Pembayaran" },
    paymentProof: { type: String, reuqired: true, default: "" },
    isCOD: { type: Boolean, required: true, default: false },
    isRated: { type: Boolean, required: true, default: false },
    rated: { type: Number, required: true, default: 3 },
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrder>("Order", OrderSchema);
