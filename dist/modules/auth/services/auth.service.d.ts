import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { MailService } from 'src/modules/mail/mail.service';
import { ResetPasswordDTO } from '../dtos/resetPassword.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly mailService;
    constructor(userService: UserService, jwtService: JwtService, mailService: MailService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        accessToken: string;
        user: import("../../user/interfaces/user.interface").User;
    }>;
    register(createUserDto: CreateUserDto): Promise<any>;
    resetPasswordEmail(email: string): Promise<void>;
    resetPassword(resetPassword: ResetPasswordDTO): Promise<{
        status: string;
        message: string;
    }>;
    createToken(payload: object, user: any): string;
}
