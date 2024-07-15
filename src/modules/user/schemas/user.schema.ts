import { Schema, Types } from 'mongoose';
import { DocumentTypeEnum } from '../enums/document-type.enum';
const uniqueValidator = require('mongoose-unique-validator');
const mongooseHidden = require('mongoose-hidden');

if (!uniqueValidator) {
  throw new Error('Error: mongoose-unique-validator no está definido');
}
if (!mongooseHidden) {
  throw new Error('Error: mongoose-hidden no está definido');
}

export const UserSchema = new Schema({
  name: { type: String, trim: true, required: true },
  lastname: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true, index: { unique: true } },
  password: { type: String, trim: true, hide: true },
  address: { type: String, trim: true, require: true },
  addressDetails: { type: String, trim: true, require: false },
  postalCode: { type: String, trim: true, require: true },
  city: { type: String, trim: true, require: true },
  birthDate: { type: Date, trim: true, required: true },
  idNumber: { type: String, trim: true, require: true },
  preferences: {
    type: [{ type: Types.ObjectId, ref: 'Preference' }],
    trim: true,
    required: true
  },
  user_status: {
    type: [String],
    enum: ["enabled", "disabled", "deleted"],
    default: "enabled",
    required: true,
  },
  documentType: {
    type: String,
    enum: Object.values(DocumentTypeEnum),
    required: false,
  },
  roles: {
    type: [String],
    default: "user",
    required: true,
  },
  created_at: { type: Date, required: false, default: Date.now() },
  updated_at: { type: Date },
});

UserSchema.plugin(uniqueValidator)
UserSchema.plugin(mongooseHidden())

UserSchema.set('toObject', { virtuals: true })
UserSchema.set('toJSON', { virtuals: true })