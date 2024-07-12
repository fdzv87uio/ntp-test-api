import { Document } from 'mongoose';
export interface User extends Document {
  name: string;
  lastname: string;
  email: string;
  password: string;
  address: string;
  birthDate: Date;
  preferences: string[];
  user_status: string;
  created_at: Date;
  updated_at?: Date;
  roles: string[];
}
