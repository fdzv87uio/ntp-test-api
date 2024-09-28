import { MailService } from './mail.service';
import { TestDTO } from './dtos/test.dto';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendEmail(testEmail: TestDTO): Promise<void>;
}
