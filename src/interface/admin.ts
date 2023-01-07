export interface IAdmin {
  id?: any;
  name: string;
  email: string;
  phone: string;
  password: string;
  description: string;
  certificatePIRT: string;
  certificateHalal: string;
  isActive: boolean;
  isOpen: boolean;
  address: string;
  rated: string;
  rating: number[];
  createdAt?: Date;
  updatedAt?: Date;
}
