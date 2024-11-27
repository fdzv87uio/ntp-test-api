import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        accessToken: string;
        user: import("../../user/interfaces/user.interface").User;
    }>;
    register(createUserDto: CreateUserDto): Promise<any>;
    validateToken(token: string): Promise<{
        status: string;
        data: any;
    }>;
    createToken(payload: object): string;
}
