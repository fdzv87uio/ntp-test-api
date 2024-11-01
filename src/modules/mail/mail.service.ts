import { Injectable } from '@nestjs/common';
import { MailDataRequired } from '@sendgrid/mail';
import { SendGridClient } from './sendgrid-client';

@Injectable()
export class MailService {
    constructor(private readonly sendGridClient: SendGridClient) {}

    async sendSimpleEmail(recipient: string, body: string): Promise<void> {
        const mail: MailDataRequired = {
            to: recipient,
            from: 'support@picosa.net', //Approved sender ID in Sendgrid
            subject: 'Tienes un mensaje de PICOSA.NET',
            text: body
        };
        await this.sendGridClient.send(mail);
    }

    async sendEmailWithTemplate(recipient: string, body: string): Promise<void> {
        const mail: MailDataRequired = {
            to: recipient,
            cc: 'example@mail.com', //Assuming you want to send a copy to this email
            from: 'noreply@domain.com', //Approved sender ID in Sendgrid
            templateId: 'Sendgrid_template_ID', //Retrieve from config service or environment variable
            dynamicTemplateData: { body, subject: 'Send Email with template' }, //The data to be used in the template
        };
        await this.sendGridClient.send(mail);
    }
}