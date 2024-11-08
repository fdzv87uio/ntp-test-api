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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./schemas/order.schema");
const user_service_1 = require("../user/services/user.service");
const mail_service_1 = require("../mail/mail.service");
let OrderService = class OrderService {
    constructor(orderModel, userService, mailService) {
        this.orderModel = orderModel;
        this.userService = userService;
        this.mailService = mailService;
    }
    async findAllOrders() {
        const orders = await this.orderModel.find();
        return orders;
    }
    async findAllOrdersByUserEmail(email) {
        const res = await this.orderModel.find({ userEmail: email });
        if (!res) {
            throw new common_1.NotFoundException('Orders Not Found');
        }
        return res;
    }
    getQuota(plan) {
        if (plan === 'pro') {
            return 3;
        }
        else if (plan === 'premium') {
            return 8;
        }
    }
    async createOrder(order) {
        const currentUser = await this.userService.findOneById(order.userId);
        if (!currentUser) {
            throw new common_1.NotFoundException('User Not Found');
        }
        else {
            const current = currentUser;
            const planString = order.item.split('-');
            const dayNumber = parseInt(planString[1]);
            current.plan = [planString[0]];
            current.quota = this.getQuota(planString[0]);
            const today = new Date();
            const dealine = new Date(today);
            dealine.setDate(today.getDate() + dayNumber);
            current.deadline = dealine;
            const res = await this.userService.updateById(order.userId, current);
            if (res) {
                const result = await this.orderModel.create(order);
                const msg = `Estimado usuario, Muchas Gracias por preferir PICOSA:NET. El siguente plan ha sido activado: ${order.item}. Su plan caduca el ${dealine}.`;
                await this.mailService.sendSimpleEmail(currentUser.email, msg);
                const msg2 = `Estimado Administrador, Le notificamos que el usuario ${currentUser.email} ha creado una orden. Ingrese al sistema para activarla.`;
                await this.mailService.sendSimpleEmail(currentUser.email, msg2);
                return result;
            }
        }
    }
    async deleteOrderById(id) {
        const res = await this.orderModel.findByIdAndDelete(id);
        return res;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        mail_service_1.MailService])
], OrderService);
//# sourceMappingURL=order.service.js.map