import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email }).exec()
    if (!user) return null;
    return user;
  }


  async create(createUserDto: any): Promise<User> {
    try {
      const createdUser: any = new this.userModel(createUserDto);
      createdUser.user_status = "enabled";
      createdUser.email = createdUser.email.toLowerCase();
      await createdUser.save();
      return await this.findOne(createdUser.email);
    } catch (err) {
      log("create User " + err.message)
      throw new BadRequestException("user not registered");
    }
  }


  async myProfile(email: string, needPassword: boolean = true) {
    const select: any = ['email']
    if (needPassword) select.push('password')
    const profile = await this.findOne(email);
    if (!profile) throw new NotFoundException('User not found');
    if (!profile.user_status.includes('enabled')) throw new BadRequestException('Your account is not active');
    return profile;
  }
}
