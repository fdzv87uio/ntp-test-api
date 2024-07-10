/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { aesDecrypt, aesEncrypt } from '../utils/aes';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        try {
            const user = await this.userService.myProfile(email)
            if (user) {
                const decryptedPassword = aesDecrypt(user.password);
                const result = await compare(password, decryptedPassword)
                if (result) {
                    return result;
                }
            } else {
                throw new NotFoundException("User not Found")
            }
        } catch (error) {
            console.log('err', error);
            return null
        }

        return null
    }

    async login(user: any) {
        const { email, password, ...rest } = user;
        const payload = {
            sub: email,
            ...rest,
        };
        return {
            accessToken: this.jwtService.sign(payload),
            user: await this.userService.findOne(email)
        };
    }

    async register(createUserDto: CreateUserDto): Promise<any> {
        const userRegisted = await this.userService.findOne(createUserDto.email);

        if (userRegisted) {
            throw new UnauthorizedException('User already exists')
        }
        const currentData: any = createUserDto;
        const currentPassword = createUserDto.password;
        const encryptedPassword = aesEncrypt(currentPassword);
        currentData.password = encryptedPassword;
        const user = await this.userService.create(currentData);
        const token = await this.login(user);
        const accessToken = token.accessToken;
        return {
            accessToken,
            user
        }

    }
}

