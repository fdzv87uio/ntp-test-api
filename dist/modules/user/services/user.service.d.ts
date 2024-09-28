import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    findAll(): Promise<User[]>;
    findOne(email: string): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    updateByEmail(email: string, user: UpdateUserDto): Promise<User>;
    myProfile(email: string, needPassword?: boolean): Promise<User>;
}
