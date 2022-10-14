export interface IProduct {
  id?: any;
  adminId: string;
  admin: string;
  name: string;
  description: string;
  price: number;
  picture: string;
  available: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
