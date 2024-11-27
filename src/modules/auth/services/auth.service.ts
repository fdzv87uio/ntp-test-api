/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
            throw new Error(error.message);
        }
    }

    async login(user: any) {
        const { email, password, ...rest } = user;
        const payload = {
            sub: email,
            ...rest,
        };

        const foundUser = await this.userService.findOne(email);
        if (foundUser && foundUser.user_status[0] === "enabled") {
            return {
                accessToken: this.jwtService.sign(payload),
                user: foundUser
            }
        } else {
            throw new UnauthorizedException("Your Account Needs Verification")
        }

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
        const payload = { id: user.id, email: user.email };
        const token = this.createToken(payload);
        return {
            user: user,
            token: token,
        }

    }

    async validateToken(token: string) {
        try {
            const secret = JSON.stringify({
                secret: process.env.JWT_SECRET,
            });
            const info = this.jwtService.verify(token);
            return {
                status: "success",
                data: info,
            };
        } catch (err) {
            throw new ForbiddenException('expired or invalid token');
        }

    }

    //Utils

    createToken(payload: object) {
        return this.jwtService.sign(payload, {
            secret: JSON.stringify({
                secret: process.env.JWT_SECRET,
            }),
        });
    }
}

