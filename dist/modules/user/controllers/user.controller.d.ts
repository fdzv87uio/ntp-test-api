import { UserService } from '../services/user.service';
import { User } from '../interfaces/user.interface';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findById(email: string): Promise<User>;
    updateByEmail(email: string): Promise<User>;
}
