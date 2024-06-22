import { Document } from 'mongoose';
import { DocumentTypeEnum } from '../enums/document-type.enum';

export interface User extends Document {
  name: string;
  lastname: string;
  email: string;
  password: string;
  address: string;
  bithDate: Date;
  user_status: string;
  documentType: DocumentTypeEnum;
  created_at: Date;
  updated_at?: Date;
  roles: string[];
}
