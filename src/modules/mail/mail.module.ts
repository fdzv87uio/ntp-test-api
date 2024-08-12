import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailController } from './mail.controller';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: configService.get('MAIL_HOST (PENDING)'),
                    secure: true,
                    port: 465,
                    auth: {
                        user: configService.get('MAIL_USER (PENDING)'),
                        pass: configService.get('MAIL_PASS (PENDING)')
                    },
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [MailService],
    controllers: [MailController],
})
export class MailModule {}
