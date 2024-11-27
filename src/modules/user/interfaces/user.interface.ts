import { Document } from 'mongoose';
//comment
export interface User extends Document {
  email: string;
  password: string;
  user_status: string;
}
