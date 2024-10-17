import { Document } from 'mongoose';
export interface User extends Document {
  name?: string;
  lastname?: string;
  email: string;
  password: string;
  address?: string;
  city?: string;
  country?: string;
  birthDate?: Date;
  idNumber?: string;
  idType?: string;
  user_status: string;
  created_at: Date;
  updated_at?: Date;
  roles: string[];
  tasks?: any[];
  answers?: any[];
  account_balance?: [number];
}
