import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendGridClient } from './sendgrid-client';


@Module({
    providers: [MailService, SendGridClient],
    exports: [MailService, SendGridClient],
})
export class MailModule {}
