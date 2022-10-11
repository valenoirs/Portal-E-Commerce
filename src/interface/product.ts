export interface IProduct {
  id?: any;
  adminId: string;
  name: string;
  description: string;
  price: number;
  picture: string;
  available: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
