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
exports.PaymentMethodService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const paymentMethod_schema_1 = require("./schemas/paymentMethod.schema");
const paypalUtils_1 = require("./utils/paypalUtils");
const mail_service_1 = require("../mail/mail.service");
let PaymentMethodService = class PaymentMethodService {
    constructor(paymentMethodModel, mailService) {
        this.paymentMethodModel = paymentMethodModel;
        this.mailService = mailService;
    }
    async findAllPaymentMehtods() {
        const paymentMethods = await this.paymentMethodModel.find();
        return paymentMethods;
    }
    async findAllPaymentMehtodsByUserEmail(email) {
        const res = await this.paymentMethodModel.find({ userEmail: email });
        if (!res) {
            throw new common_1.NotFoundException('Payment Mehtods Not Found');
        }
        return res;
    }
    async createPaymentMethod(paymentMethod) {
        const res = await this.paymentMethodModel.create(paymentMethod);
        return res;
    }
    async deletePaymentMethodById(id) {
        const res = await this.paymentMethodModel.findByIdAndDelete(id);
        return res;
    }
    async activatePaymentMethodById(id) {
        const res1 = await this.paymentMethodModel.find({ _id: id });
        if (!res1) {
            throw new common_1.NotFoundException('Payment Mehtods Not Found');
        }
        else {
            const current = res1[0];
            current.status = "active";
            const res = await this.paymentMethodModel.findOneAndUpdate({ _id: id }, current, {
                new: true,
                runValidators: false
            });
            if (!res) {
                throw new common_1.NotFoundException('Payment Method Not Found not found');
            }
            else {
                const msg = `Estimado usuario, Le notificamos que el siguente método de ppago ha sido activado: ${current.description}, Ahora puede realizar compras en nuestras plataforma.`;
                await this.mailService.sendSimpleEmail(current.userEmail, msg);
                return res;
            }
        }
    }
    async processPayment() {
        try {
            const accessToken = await (0, paypalUtils_1.getAccessToken)();
            const paymentDetails = {
                amount: '10.00',
                currency: 'USD',
                description: 'Test payment',
            };
            const orderResponse = await (0, paypalUtils_1.createPayment)(accessToken, paymentDetails);
            console.log('Order created:', orderResponse);
            const captureResponse = await (0, paypalUtils_1.capturePayment)(accessToken, orderResponse.id);
            console.log('Payment captured:', captureResponse);
        }
        catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    }
};
exports.PaymentMethodService = PaymentMethodService;
exports.PaymentMethodService = PaymentMethodService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(paymentMethod_schema_1.PaymentMethod.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mail_service_1.MailService])
], PaymentMethodService);
//# sourceMappingURL=paymentMethod.service.js.map