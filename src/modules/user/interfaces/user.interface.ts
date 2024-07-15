import { Document } from 'mongoose';
export interface User extends Document {
  name: string;
  lastname: string;
  email: string;
  password: string;
  address: string;
  addressDetails: string;
  postalCode: string;
  city: string;
  birthDate: Date;
  idNumber: string;
  preferences: string[];
  user_status: string;
  created_at: Date;
  updated_at?: Date;
  roles: string[];
}
