import {Document} from 'mongoose'
export interface AuthIdAccount extends Document {
    name: String;
    lastname: String;
    email:String;
    phone:String;
    accountNumber:String;
    created_at: Date;
    updated_at?: Date;
}