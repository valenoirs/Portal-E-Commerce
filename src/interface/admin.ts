export interface IAdmin {
  id?: any;
  name: string;
  email: string;
  phone: string;
  password: string;
  certificatePIRT: string;
  certificateHalal: string;
  isActive: boolean;
  isOpen: boolean;
  address: string;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
}
