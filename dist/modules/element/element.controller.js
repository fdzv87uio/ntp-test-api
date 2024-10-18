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
exports.ElementController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guard_1 = require("../auth/guard");
const element_service_1 = require("./element.service");
const createElement_dto_1 = require("./dtos/createElement.dto");
const updateElement_dto_1 = require("./dtos/updateElement.dto");
let ElementController = class ElementController {
    constructor(elementService) {
        this.elementService = elementService;
    }
    async getAllElements() {
        return this.elementService.findAllElements();
    }
    async getAllElementsByUserId(userEmail) {
        return this.elementService.findAllAvailableElementsByUserEmail(userEmail);
    }
    async createElement(element) {
        return this.elementService.createElement(element);
    }
    async getElementBySlug(slug) {
        return this.elementService.findElementBySlug(slug);
    }
    async getElement(id) {
        return this.elementService.findElementById(id);
    }
    async updateElement(id, element) {
        return this.elementService.updateElementById(id, element);
    }
    async deleteElement(id) {
        return this.elementService.deleteElementById(id);
    }
};
exports.ElementController = ElementController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Elements' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ElementController.prototype, "getAllElements", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get All Available Elements by User Email' }),
    (0, common_1.Get)('getAllAvaliableByUserEmail/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ElementController.prototype, "getAllElementsByUserId", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create New Element' }),
    (0, common_1.Post)('new'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createElement_dto_1.CreateElementDTO]),
    __metadata("design:returntype", Promise)
], ElementController.prototype, "createElement", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Element By ID' }),
    (0, common_1.Get)('getElementBySlug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ElementController.prototype, "getElementBySlug", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Element By ID' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ElementController.prototype, "getElement", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update Element' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateElement_dto_1.UpdateElementDTO]),
    __metadata("design:returntype", Promise)
], ElementController.prototype, "updateElement", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Element' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ElementController.prototype, "deleteElement", null);
exports.ElementController = ElementController = __decorate([
    (0, swagger_1.ApiTags)('Elements'),
    (0, common_1.Controller)('element'),
    __metadata("design:paramtypes", [element_service_1.ElementService])
], ElementController);
//# sourceMappingURL=element.controller.js.map