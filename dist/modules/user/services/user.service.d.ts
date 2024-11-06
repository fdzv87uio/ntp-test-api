import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { UpdateUserDto } from '../dtos/update-user.dto';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    findAll(): Promise<User[]>;
    findOne(email: string): Promise<User>;
    findOneById(id: string): Promise<User>;
    create(createUserDto: any): Promise<User>;
    updateByEmail(email: string, user: UpdateUserDto): Promise<User>;
    resetUserStatus(email: string): Promise<User>;
    updateById(id: string, user: UpdateUserDto): Promise<User>;
    myProfile(email: string, needPassword?: boolean): Promise<User>;
}
