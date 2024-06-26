import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async validateUser (email: string, password: string): Promise<any>{
        // const user = await this.userService.findByEmail(email);
        try {
            const user = await this.userService.myProfile(email)           
            if (user && await compare(password, user.password) ) {
                return user;
            }
        } catch (error) {
            console.log('err', error);
            return null
        }
       
        return null
    }

      login(user: any){        
        const {email, password, ...rest } = user;
        const payload = {
            sub: email,
            ...rest,
        };       

        return {
            accessToken: this.jwtService.sign(payload),
            payload
        }
    }

    async register(createUserDto: CreateUserDto):Promise<any>{
      const user =  await this.userService.create(createUserDto);
      const token =  await this.login(user);
      const accessToken = token.accessToken;
      return {
        accessToken,
        user        
      }
    }
}

