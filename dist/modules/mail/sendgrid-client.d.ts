import { MailDataRequired } from '@sendgrid/mail';
export declare class SendGridClient {
    private logger;
    constructor();
    send(mail: MailDataRequired): Promise<void>;
}
