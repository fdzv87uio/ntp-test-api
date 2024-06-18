import { Schema, model } from 'mongoose'
const uniqueValidator = require('mongoose-unique-validator');
const mongooseHidden  = require('mongoose-hidden');

export  const AuthIdAccountSchema = new Schema({ 
    name: { type: String, trim: true, required: true, },
    lastname:{type:String, trim:true, required: true },
    email : { type: String, trim: true, index: { unique: true } },
    phone: {type: String, trim: true },
    accountNumber:{type: String, trim: true },
    oneTimeSecret:{type: String, trim: true },
    operationId: {type: String, trim: true },
    operationURL: {type: String, trim: true },
    qrcodeUrl: {type: String, trim: true },
    codeword : {type: String, trim: true },   
    created_at: { type: Date, required: false, default: Date.now() },
    updated_at:{ type: Date },
});

AuthIdAccountSchema.plugin(uniqueValidator)
AuthIdAccountSchema.plugin(mongooseHidden())

AuthIdAccountSchema.set('toObject', { virtuals: true })
AuthIdAccountSchema.set('toJSON', { virtuals: true })

 
