import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendInvite(email: string, message: string) {
        try {
            await this.mailerService.sendMail({
                to: email,
                from: 'PENDING', // sender address
                subject: 'Curcleup is inviting you to an Event', // Subject line
                text: message, // plaintext body
                // html: '<p>How many programmers does it take to change a light bulb? None, that’s a hardware problem.</p>',
            });
            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
            };
        }
    }
}