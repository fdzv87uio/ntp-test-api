import { UserService } from '../../user/services/user.service';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dtos/login.dto';
import { CreateUserDto } from '../../user/dtos/create-user.dto';
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
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        dataAuthRegister: any;
    }>;
    findById(token: string): Promise<any>;
}
