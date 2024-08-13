import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { InviteDTO } from './dtos/invite.dto';

@Controller('mail')
export class MailController {

    constructor(
        private readonly mailService: MailService
    ) {}

    @Post('sendInvite')
    async login(@Body() invite: InviteDTO) {
        const dataAuth = await this.mailService.sendInvite(invite.email, invite.message);
        return {
            message: 'Invite Sent',
            dataAuth: dataAuth
        }
    }
}
