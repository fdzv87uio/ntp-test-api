import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiTags } from '@nestjs/swagger';
import { TestDTO } from './dtos/test.dto';

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
}
