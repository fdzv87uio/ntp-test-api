import { Types } from "mongoose";

export interface PreferenceExtra extends Document {
    value: string;
    documentId: Types.ObjectId;
  }