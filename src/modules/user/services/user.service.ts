import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }  

  async findOne(email: string): Promise<User> {    
    const user = this.userModel.findOne({email: email}).exec()
    if(!user)  throw new NotFoundException('User not found');
    return user; 
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async myProfile (email: any, needPassword: boolean = true)  {
    const select: any = ['email']
    if (needPassword) select.push('password')
    const profile = await this.findOne(email);        
    if (!profile.user_status.includes('enabled'))
        throw new BadRequestException('Your account is not active');   
    return profile; 
 }

}
