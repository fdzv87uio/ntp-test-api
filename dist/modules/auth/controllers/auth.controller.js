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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("../../user/services/user.service");
const decorators_1 = require("../../common/decorators");
const auth_service_1 = require("../services/auth.service");
const guard_1 = require("../guard");
const login_dto_1 = require("../dtos/login.dto");
const create_user_dto_1 = require("../../user/dtos/create-user.dto");
const forgotPassword_dto_1 = require("../dtos/forgotPassword.dto");
const resetPassword_dto_1 = require("../dtos/resetPassword.dto");
const verifyAccount_sto_1 = require("../dtos/verifyAccount.sto");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async login(user) {
        const dataAuth = await this.authService.login(user);
        return {
            message: 'Login success',
            dataAuth: dataAuth
        };
    }
    test(req) {
        return 'Test Token service';
    }
    profile(email) {
        return this.userService.myProfile(email);
    }
    async create(createUserDto) {
        const dataAuthRegister = await this.authService.register(createUserDto);
        return {
            message: 'register success',
            dataAuthRegister
        };
    }
    async forgotPassword(forgotPasswordDTO) {
        await this.authService.resetPasswordEmail(forgotPasswordDTO.email);
        return {
            message: 'password reset email sent',
        };
    }
    async resetPassword(resetPasswordDTO) {
        const res = await this.authService.resetPassword(resetPasswordDTO);
        return res;
    }
    async verifyPassword(verifyAccount) {
        const res = await this.authService.verifyAccount(verifyAccount.email, verifyAccount.token);
        return res;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('test'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "test", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('profile'),
    __param(0, (0, decorators_1.Email)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "profile", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Registry new user' }),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Password Reset email' }),
    (0, common_1.Post)('forgotPassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgotPassword_dto_1.ForgotPasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Reset Password' }),
    (0, common_1.Post)('resetPassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resetPassword_dto_1.ResetPasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Verify Account' }),
    (0, common_1.Post)('verifyAccount'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verifyAccount_sto_1.VerifyAccountDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map