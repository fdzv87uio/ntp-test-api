import { MailService } from './mail.service';
import { TestDTO } from './dtos/test.dto';
import { CompleteEmailDTO } from './dtos/completeEmail.dto';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendEmail(testEmail: TestDTO): Promise<void>;
    sendCompleteEmail(testEmail: CompleteEmailDTO): Promise<void>;
}
