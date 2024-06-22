export class AuthIdResponses{
    success: Boolean;
    messageCode: String;
    statusCode:String;
    data: Object; 
    
    constructor(success: boolean, statusCode: string, messageCode: string, data: any) {
        this.success = success;
        this.statusCode = statusCode;
        this.messageCode = messageCode;
        this.data = data;
    }
}