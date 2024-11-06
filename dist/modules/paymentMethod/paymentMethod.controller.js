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
exports.PaymentMethodController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const paymentMethod_service_1 = require("./paymentMethod.service");
const createPaymentMethod_dto_1 = require("./dtos/createPaymentMethod.dto");
let PaymentMethodController = class PaymentMethodController {
    constructor(paymentMethodService) {
        this.paymentMethodService = paymentMethodService;
    }
    async getAllPaymentMethods() {
        return this.paymentMethodService.findAllPaymentMehtods();
    }
    async getAllPaymentMethodsByUserEmail(email) {
        return this.paymentMethodService.findAllPaymentMehtodsByUserEmail(email);
    }
    async createPaymentMethod(paymentMethod) {
        return this.paymentMethodService.createPaymentMethod(paymentMethod);
    }
    async deletePaymentMethod(id) {
        return this.paymentMethodService.deletePaymentMethodById(id);
    }
    async activatePaymentMethod(id) {
        return this.paymentMethodService.activatePaymentMethodById(id);
    }
};
exports.PaymentMethodController = PaymentMethodController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Payment Methods' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentMethodController.prototype, "getAllPaymentMethods", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Payment Methods by User Email' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('getAllByUserEmail/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentMethodController.prototype, "getAllPaymentMethodsByUserEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create New Payment Method' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('new'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createPaymentMethod_dto_1.PaymentMethodDTO]),
    __metadata("design:returntype", Promise)
], PaymentMethodController.prototype, "createPaymentMethod", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete Payment Method' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentMethodController.prototype, "deletePaymentMethod", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Activate Payment Method by Id' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('activate/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentMethodController.prototype, "activatePaymentMethod", null);
exports.PaymentMethodController = PaymentMethodController = __decorate([
    (0, swagger_1.ApiTags)('PaymentMethods'),
    (0, common_1.Controller)('paymentMethods'),
    __metadata("design:paramtypes", [paymentMethod_service_1.PaymentMethodService])
], PaymentMethodController);
//# sourceMappingURL=paymentMethod.controller.js.map