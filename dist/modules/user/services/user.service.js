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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const console_1 = require("console");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findAll() {
        return this.userModel.find().exec();
    }
    async findOne(email) {
        const user = await this.userModel.findOne({ email: email }).exec();
        if (!user)
            return null;
        return user;
    }
    async create(createUserDto) {
        try {
            const createdUser = new this.userModel(createUserDto);
            createdUser.user_status = "enabled";
            createdUser.plan = "none";
            createdUser.email = createdUser.email.toLowerCase();
            await createdUser.save();
            return await this.findOne(createdUser.email);
        }
        catch (err) {
            (0, console_1.log)("create User " + err.message);
            throw new common_1.BadRequestException("user not registered");
        }
    }
    async updateByEmail(email, user) {
        const res = await this.userModel.findOneAndUpdate({ email: email }, user, {
            new: true,
            runValidators: false
        });
        if (!res)
            throw new common_1.NotFoundException('User not found');
        return res;
    }
    async myProfile(email, needPassword = true) {
        const select = ['email'];
        if (needPassword)
            select.push('password');
        const profile = await this.findOne(email);
        if (!profile)
            throw new common_1.NotFoundException('User not found');
        if (!profile.user_status.includes('enabled'))
            throw new common_1.BadRequestException('Your account is not active');
        return profile;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map