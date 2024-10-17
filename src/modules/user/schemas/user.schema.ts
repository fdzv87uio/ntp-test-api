import { Schema } from 'mongoose';
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
  name: { type: String, trim: true, required: false },
  lastname: { type: String, trim: true, required: false },
  email: { type: String, trim: true, required: true, index: { unique: true } },
  password: { type: String, trim: true, hide: true },
  address: { type: String, trim: true, require: false },
  city: { type: String, trim: true, require: false },
  country: { type: String, trim: true, require: false },
  birthDate: { type: Date, trim: true, required: false },
  idNumber: { type: String, trim: true, require: false },
  idType: {
    type: String,
    enum: DocumentTypeEnum,
    required: false
  },
  user_status: {
    type: [String],
    enum: ["enabled", "disabled", "deleted"],
    default: "enabled",
    required: true,
  },
  plan: {
    type: String,
    default: "none",
    required: true,
  },
  roles: {
    type: [String],
    enum: ["user", "admin"],
    required: true,
  },
  tasks: {
    type: [{ type: Schema.Types.Mixed }],
    required: false,
  },
  answers: {
    type: [{ type: Schema.Types.Mixed }],
    required: false,
  },
  account_balance: {
    type: [Number],
    default: 0,
  },
  created_at: { type: Date, required: false, default: Date.now() },
  updated_at: { type: Date },
});

UserSchema.plugin(uniqueValidator)
UserSchema.plugin(mongooseHidden())

UserSchema.set('toObject', { virtuals: true })
UserSchema.set('toJSON', { virtuals: true })