import {Document} from 'mongoose'
export interface AuthIdResponse extends Document {
    success: Boolean;
    messageCode: String;
    statusCode:String;
    data: Object;    
}