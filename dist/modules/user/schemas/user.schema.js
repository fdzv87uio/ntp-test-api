"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const document_type_enum_1 = require("../enums/document-type.enum");
const uniqueValidator = require('mongoose-unique-validator');
const mongooseHidden = require('mongoose-hidden');
if (!uniqueValidator) {
    throw new Error('Error: mongoose-unique-validator no está definido');
}
if (!mongooseHidden) {
    throw new Error('Error: mongoose-hidden no está definido');
}
exports.UserSchema = new mongoose_1.Schema({
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
        enum: document_type_enum_1.DocumentTypeEnum,
        required: false
    },
    user_status: {
        type: [String],
        enum: ["enabled", "disabled", "deleted"],
        default: "enabled",
        required: true,
    },
    plan: {
        type: [String],
        enum: ["none", "weekly", "monthly", "premium"],
        default: "none",
        required: true,
    },
    roles: {
        type: [String],
        enum: ["user", "admin"],
        required: true,
    },
    tasks: {
        type: [{ type: mongoose_1.Schema.Types.Mixed }],
        required: false,
    },
    answers: {
        type: [{ type: mongoose_1.Schema.Types.Mixed }],
        required: false,
    },
    account_balance: {
        type: [Number],
        default: 0,
    },
    created_at: { type: Date, required: false, default: Date.now() },
    updated_at: { type: Date },
});
exports.UserSchema.plugin(uniqueValidator);
exports.UserSchema.plugin(mongooseHidden());
exports.UserSchema.set('toObject', { virtuals: true });
exports.UserSchema.set('toJSON', { virtuals: true });
//# sourceMappingURL=user.schema.js.map