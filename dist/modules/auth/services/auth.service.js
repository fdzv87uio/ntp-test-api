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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/services/user.service");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const aes_1 = require("../utils/aes");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
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
        const token = this.createToken(payload);
        return {
            user: user,
            token: token,
        };
    }
    async validateToken(token) {
        try {
            const secret = JSON.stringify({
                secret: process.env.JWT_SECRET,
            });
            const info = this.jwtService.verify(token);
            return {
                status: "success",
                data: info,
            };
        }
        catch (err) {
            throw new common_1.ForbiddenException('expired or invalid token');
        }
    }
    createToken(payload) {
        return this.jwtService.sign(payload, {
            secret: JSON.stringify({
                secret: process.env.JWT_SECRET,
            }),
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map