import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiTags } from '@nestjs/swagger';
import { TestDTO } from './dtos/test.dto';
import { CompleteEmailDTO } from './dtos/completeEmail.dto';

@ApiTags('Mail')
@Controller('mail')
export class MailController {

    constructor(
        private readonly mailService: MailService
    ) {}

    @Post('sendSimpleEmail')
    async sendEmail(
        @Body() testEmail: TestDTO,
    ): Promise<void> {
        await this.mailService.sendSimpleEmail(
            testEmail.email,
            testEmail.message,
        );
    }

    @Post('sendCompleteEmail')
    async sendCompleteEmail(
        @Body() testEmail: CompleteEmailDTO,
    ): Promise<void> {
        await this.mailService.sendCompleteEmail(
            testEmail.email,
            testEmail.subject,
            testEmail.message,
        );
    }
}
