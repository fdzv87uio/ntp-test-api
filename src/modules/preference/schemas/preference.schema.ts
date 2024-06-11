import { Schema, Types } from 'mongoose';

export const PreferenceSchema = new Schema({
  name: { type: String, required: true },
  preferenceList: { type: [String], default: [] },
  PreferenceExtraIds: [{ type: Types.ObjectId, ref: 'PreferenceExtra' }],
});