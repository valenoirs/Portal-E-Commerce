export interface IOrderProduct {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  picture: string;
  productTotal: number;
}

export interface IOrder {
  id?: any;
  invoiceId: string;
  userId: string;
  userName: string;
  userPhone: string;
  adminId: string;
  adminName: string;
  adminPhone: string;
  product: any;
  totalPayment: number;
  status: string;
  paymentProof: string;
  isCOD: boolean;
  isRated: boolean;
  rated: number;
  createdAt?: Date;
  updatedAt?: Date;
}
