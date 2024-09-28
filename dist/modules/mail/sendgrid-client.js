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
var SendGridClient_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendGridClient = void 0;
const common_1 = require("@nestjs/common");
const SendGrid = require("@sendgrid/mail");
let SendGridClient = SendGridClient_1 = class SendGridClient {
    constructor() {
        this.logger = new common_1.Logger(SendGridClient_1.name);
        SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
    }
    async send(mail) {
        try {
            await SendGrid.send(mail);
            this.logger.log(`Email successfully dispatched to ${mail.to}`);
        }
        catch (error) {
            this.logger.error('Error while sending email', error);
            throw error;
        }
    }
};
exports.SendGridClient = SendGridClient;
exports.SendGridClient = SendGridClient = SendGridClient_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SendGridClient);
//# sourceMappingURL=sendgrid-client.js.map