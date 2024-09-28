import { SendGridClient } from './sendgrid-client';
export declare class MailService {
    private readonly sendGridClient;
    constructor(sendGridClient: SendGridClient);
    sendSimpleEmail(recipient: string, body: string): Promise<void>;
    sendEmailWithTemplate(recipient: string, body: string): Promise<void>;
}
