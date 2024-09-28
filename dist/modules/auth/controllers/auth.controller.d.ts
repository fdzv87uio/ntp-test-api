import { UserService } from '../../user/services/user.service';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dtos/login.dto';
import { CreateUserDto } from '../../user/dtos/create-user.dto';
import { ForgotPasswordDTO } from '../dtos/forgotPassword.dto';
import { ResetPasswordDTO } from '../dtos/resetPassword.dto';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    login(user: LoginDTO): Promise<{
        message: string;
        dataAuth: {
            accessToken: string;
            user: import("../../user/interfaces/user.interface").User;
        };
    }>;
    test(req: any): string;
    profile(email: string): Promise<import("../../user/interfaces/user.interface").User>;
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        dataAuthRegister: any;
    }>;
    forgotPassword(forgotPasswordDTO: ForgotPasswordDTO): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDTO: ResetPasswordDTO): Promise<{
        status: string;
        message: string;
    }>;
}
