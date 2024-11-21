"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/services/user.service");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const aes_1 = require("../utils/aes");
const mail_service_1 = require("../../mail/mail.service");
const formatters_1 = require("../utils/formatters");
let AuthService = class AuthService {
    constructor(userService, jwtService, mailService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async validateUser(email, password) {
        try {
            const user = await this.userService.myProfile(email);
            if (user) {
                const decryptedPassword = (0, aes_1.aesDecrypt)(user.password);
                const result = await (0, bcrypt_1.compare)(password, decryptedPassword);
                if (result) {
                    return result;
                }
            }
            else {
                throw new common_1.NotFoundException("User not Found");
            }
        }
        catch (error) {
            console.log('err', error);
            throw new Error(error.message);
        }
    }
    async login(user) {
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
            };
        }
        else {
            throw new common_1.UnauthorizedException("Your Account Needs Verification");
        }
    }
    async register(createUserDto) {
        const userRegisted = await this.userService.findOne(createUserDto.email);
        if (userRegisted) {
            throw new common_1.UnauthorizedException('User already exists');
        }
        const currentData = createUserDto;
        const currentPassword = createUserDto.password;
        const encryptedPassword = (0, aes_1.aesEncrypt)(currentPassword);
        currentData.password = encryptedPassword;
        const user = await this.userService.create(currentData);
        const payload = { id: user.id, email: user.email };
        const token = this.createToken(payload, user);
        const currentSite = currentData.site ? currentData.site : "picosa";
        const currentDomain = (0, formatters_1.getDomain)(currentSite);
        const msgEmail = user.email;
        const tokenURL = `${currentDomain}/verify-email/${msgEmail}/${token}`;
        const msg = `Estimado Usuario de ${currentSite.toUpperCase()}: Utilice el siguiente link y cópielo en su explorador para verificar su cuenta: ${tokenURL}`;
        await this.mailService.sendCompleteEmail(msgEmail, `${currentSite.toUpperCase()} - Verificación de Cuenta`, msg);
        return {
            user
        };
    }
    async verifyAccount(email, token) {
        const user = await this.userService.findOne(email);
        try {
            const secret = JSON.stringify({
                secret: process.env.JWT_SECRET,
                updatedAt: user.updatedAt,
            });
            this.jwtService.verify(token, {
                secret,
            });
        }
        catch (err) {
            throw new common_1.ForbiddenException('expired or invalid token');
        }
        if (!user)
            throw new common_1.NotFoundException("user doesn't exist");
        if (!(await this.userService.updateByEmail(email, { user_status: 'enabled' })))
            throw new common_1.ServiceUnavailableException('something went wrong, please try again later');
        return {
            status: "success",
            message: 'Account verified successfully',
        };
    }
    async resetPasswordEmail(email) {
        const user = await this.userService.findOne(email);
        if (!user)
            throw new common_1.NotFoundException("user doesn't exist");
        const payload = { id: user.id, email: user.email };
        const token = this.createToken(payload, user);
        const link = `${process.env.CURCLE_APP_URI}/passwordRecovery/${user.email}/${token}`;
        const message = `Hello ${user.email}, Please, follow the following link to rest your password: ${link}`;
        await this.mailService.sendSimpleEmail(user.email, message);
    }
    async resetPassword(resetPassword) {
        const email = resetPassword.email;
        const token = resetPassword.token;
        const user = await this.userService.findOne(email);
        try {
            const secret = JSON.stringify({
                secret: process.env.JWT_SECRET,
                updatedAt: user.updatedAt,
            });
            this.jwtService.verify(token, {
                secret,
            });
        }
        catch (err) {
            throw new common_1.ForbiddenException('expired or invalid token');
        }
        if (!user)
            throw new common_1.NotFoundException("user doesn't exist");
        if (resetPassword.password !== resetPassword.confirmPassword)
            throw new common_1.ConflictException("passwords don't match");
        const password = (0, aes_1.aesEncrypt)(resetPassword.password);
        if (!(await this.userService.updateByEmail(email, { password: password })))
            throw new common_1.ServiceUnavailableException('something went wrong, please try again later');
        return {
            status: "success",
            message: 'password reset successfully',
        };
    }
    createToken(payload, user) {
        return this.jwtService.sign(payload, {
            secret: JSON.stringify({
                secret: process.env.JWT_SECRET,
                updatedAt: user.updatedAt,
            }),
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map