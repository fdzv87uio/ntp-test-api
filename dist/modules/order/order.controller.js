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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const order_service_1 = require("./order.service");
const createPaymentMethod_dto_1 = require("./dtos/createPaymentMethod.dto");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async getAllOrders() {
        return this.orderService.findAllOrders();
    }
    async getAllOrdersByUserEmail(userEmail) {
        return this.orderService.findAllOrdersByUserEmail(userEmail);
    }
    async createOrder(paymentMethod) {
        return this.orderService.createOrder(paymentMethod);
    }
    async deleteOrder(id) {
        return this.orderService.deleteOrderById(id);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Orders' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrders", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Orders by User ID' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('getAllByUserEmail/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrdersByUserEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create New Order' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('new'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createPaymentMethod_dto_1.OrderDTO]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete Order' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map