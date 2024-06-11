import { Schema, Types } from 'mongoose';

export const PreferenceExtraSchema = new Schema({
  value: { type: String, required: true },
  documentId: { type: Types.ObjectId, ref: 'Preference' },
});