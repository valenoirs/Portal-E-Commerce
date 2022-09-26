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
  product: any;
  orderTotal: number;
  status: string;
  payment: string;
  createdAt?: Date;
  updatedAt?: Date;
}
