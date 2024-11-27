import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    findAll(): Promise<User[]>;
    findOne(email: string): Promise<User>;
    create(createUserDto: any): Promise<User>;
    myProfile(email: string, needPassword?: boolean): Promise<User>;
}
