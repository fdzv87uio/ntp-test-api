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
exports.RealtorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guard_1 = require("../auth/guard");
const realtor_service_1 = require("./realtor.service");
const createRealtor_dto_1 = require("./dtos/createRealtor.dto");
const updateRealtor_dto_1 = require("./dtos/updateRealtor.dto");
let RealtorController = class RealtorController {
    constructor(realtorService) {
        this.realtorService = realtorService;
    }
    async getAllRealtors() {
        return this.realtorService.findAllRealtors();
    }
    async getRealtorByUserId(id) {
        return this.realtorService.findRealtorByUserId(id);
    }
    async getRealtorByd(id) {
        return this.realtorService.findRealtorById(id);
    }
    async createRealtor(realtor) {
        return this.realtorService.createRealtor(realtor);
    }
    async updateRealtor(id, realtor) {
        return this.realtorService.updateRealtorById(id, realtor);
    }
    async deleteRealtor(id) {
        return this.realtorService.deleteRealtorById(id);
    }
};
exports.RealtorController = RealtorController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Realtors' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RealtorController.prototype, "getAllRealtors", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get  Realtor by User Id' }),
    (0, common_1.Get)('getByUserId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RealtorController.prototype, "getRealtorByUserId", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get Realtor by User Id' }),
    (0, common_1.Get)('getById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RealtorController.prototype, "getRealtorByd", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create New Realtor' }),
    (0, common_1.Post)('new'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createRealtor_dto_1.CreateRealtorDTO]),
    __metadata("design:returntype", Promise)
], RealtorController.prototype, "createRealtor", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update Realtor' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateRealtor_dto_1.UpdateRealtorDTO]),
    __metadata("design:returntype", Promise)
], RealtorController.prototype, "updateRealtor", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Realtor' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RealtorController.prototype, "deleteRealtor", null);
exports.RealtorController = RealtorController = __decorate([
    (0, swagger_1.ApiTags)('Realtors'),
    (0, common_1.Controller)('realtor'),
    __metadata("design:paramtypes", [realtor_service_1.RealtorService])
], RealtorController);
//# sourceMappingURL=realtor.controller.js.map