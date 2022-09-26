export interface IProduct {
  id?: any;
  adminId: string;
  name: string;
  price: number;
  picture: string;
  available: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
