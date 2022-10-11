export interface IOrderProduct {
  name: string;
  price: number;
  quantity: number;
  picture: string;
  productTotal: number;
}

export interface IOrder {
  id?: any;
  adminId: string;
  userId: string;
  adminName: string;
  userName: string;
  product: any;
  totalPayment: number;
  status: string;
  note: string;
  paymentProof: string;
  createdAt?: Date;
  updatedAt?: Date;
}
