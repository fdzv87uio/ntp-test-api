/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { aesDecrypt, aesEncrypt } from '../utils/aes';
import { MailService } from 'src/modules/mail/mail.service';


@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService
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

    async resetPasswordEmail(email: string) {
        const user = await this.userService.findOne(email);
        if (!user)
            throw new NotFoundException("user doesn't exist");
        const payload = { id: user.id, email: user.email };
        const token = this.createToken(payload, user);
        const link = `${process.env.CURCLE_APP_URI}/passwordRecovery/${user.email}/${token}`;
        const message = `Hello ${user.email}, Please, follow the following link to rest your password: ${link}`
        await this.mailService.sendSimpleEmail(user.email, message);
    }

    createToken(payload: object, user: any) {
        return this.jwtService.sign(payload, {
            secret: JSON.stringify({
                secret: process.env.JWT_SECRET,
                updatedAt: user.updatedAt,
            }),
        });
    }
}

