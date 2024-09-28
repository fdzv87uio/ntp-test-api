import { UserService } from '../services/user.service';
import { User } from '../interfaces/user.interface';
import { UpdateUserDto } from '../dtos/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findById(email: string): Promise<User>;
    updateByEmail(email: string, updateUser: UpdateUserDto): Promise<User>;
}
