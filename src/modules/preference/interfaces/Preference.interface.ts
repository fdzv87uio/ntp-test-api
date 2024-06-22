import { Types } from "mongoose";

export interface Preference extends Document {
    name: string;
    preferenceList: string[];
    preferenceExtraIds: Types.ObjectId[];
  }