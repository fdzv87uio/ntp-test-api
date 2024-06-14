import {Document} from 'mongoose'
export interface AuthIdToken extends Document {
    accessToken: String;
    accessTokenExpirationDate: Date;
    expiresIn:String;
    refreshToken:String;
    tokenType:String;
    userExternalId:String;
}