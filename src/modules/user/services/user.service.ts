import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthService } from '../../auth/services/auth.service';
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }  

  async findOne(email: String): Promise<User> {        
    const user = await this.userModel.findOne({email: email}).exec()    
    if(!user) return null;
    return user; 
  }  

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
     createdUser.user_status = "enabled";
    return createdUser.save();
  }
   
  async myProfile (email: any, needPassword: boolean = true)  {
    const select: any = ['email']
    if (needPassword) select.push('password')
    const profile = await this.findOne(email);
  log(profile);
    if (!profile)
      throw new BadRequestException('Your account not found');      
    if (!profile.user_status.includes('enabled'))
        throw new BadRequestException('Your account is not active');   
    return profile; 
 }

}
