"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const mongooseHidden = require('mongoose-hidden');
if (!uniqueValidator) {
    throw new Error('Error: mongoose-unique-validator no está definido');
}
if (!mongooseHidden) {
    throw new Error('Error: mongoose-hidden no está definido');
}
exports.UserSchema = new mongoose_1.Schema({
    email: { type: String, trim: true, required: true, index: { unique: true } },
    password: { type: String, trim: true, hide: true },
    user_status: {
        type: [String],
        enum: ["pending", "enabled", "disabled", "deleted"],
        default: "pending",
        required: true,
    },
});
exports.UserSchema.plugin(uniqueValidator);
exports.UserSchema.plugin(mongooseHidden());
exports.UserSchema.set('toObject', { virtuals: true });
exports.UserSchema.set('toJSON', { virtuals: true });
//# sourceMappingURL=user.schema.js.map