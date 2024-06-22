import { Schema, model } from 'mongoose'
const uniqueValidator = require('mongoose-unique-validator');
const mongooseHidden  = require('mongoose-hidden');

export  const AuthIdTokenSchema = new Schema({ 
    accessToken: { type: String, trim: true, required: true, index: { unique: true } },
    expiresIn:{type:String, trim:true, required: true },
    refreshToken: { type: String, trim: true, required: true,  },
    tokenType: { type: String, trim: true },
    userExternalId: {type: String, trim: true },    
    accessTokenExpirationDate: { type: Date }
});