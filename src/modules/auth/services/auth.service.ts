/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { aesDecrypt, aesEncrypt } from '../utils/aes';
import { MailService } from 'src/modules/mail/mail.service';
import { ResetPasswordDTO } from '../dtos/resetPassword.dto';


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
        const token = this.createToken(payload, user);
        // const token = await this.login(user);
        // const accessToken = token.accessToken;
        // Send email with the Access Token
        const msgEmail = user.email;
        const tokenURL = `${process.env.PICOSA_APP_URI}/verify-email/${msgEmail}/${token}`
        const msg = `Estimdo Usuario de PICOSA.net: Utilice el siguiente link y cópielo en su explorador para verificar su cuenta: ${tokenURL}`
        await this.mailService.sendSimpleEmail(msgEmail, msg);
        return {
            user
        }

    }

    async verifyAccount(email: string, token: string): Promise<any> {
        const user: any = await this.userService.findOne(email);
        try {
            const secret = JSON.stringify({
                secret: process.env.JWT_SECRET,
                updatedAt: user.updatedAt,
            });
            this.jwtService.verify(token, {
                secret,
            });
        } catch (err) {
            throw new ForbiddenException('expired or invalid token');
        }
        if (!user)
            throw new NotFoundException("user doesn't exist");
        if (!(await this.userService.updateByEmail(email, { user_status: 'enabled' })))
            throw new ServiceUnavailableException('something went wrong, please try again later');
        return {
            status: "success",
            message: 'Account verified successfully',
        };
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

    async resetPassword(resetPassword: ResetPasswordDTO) {
        const email = resetPassword.email;
        const token = resetPassword.token;
        const user: any = await this.userService.findOne(email);

        try {
            const secret = JSON.stringify({
                secret: process.env.JWT_SECRET,
                updatedAt: user.updatedAt,
            });
            this.jwtService.verify(token, {
                secret,
            });
        } catch (err) {
            throw new ForbiddenException('expired or invalid token');
        }
        if (!user)
            throw new NotFoundException("user doesn't exist");
        if (resetPassword.password !== resetPassword.confirmPassword)
            throw new ConflictException("passwords don't match");
        const password = aesEncrypt(resetPassword.password);
        if (!(await this.userService.updateByEmail(email, { password: password })))
            throw new ServiceUnavailableException('something went wrong, please try again later');
        return {
            status: "success",
            message: 'password reset successfully',
        };
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

