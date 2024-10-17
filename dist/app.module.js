"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/auth/auth.module");
const user_module_1 = require("./modules/user/user.module");
const event_module_1 = require("./modules/event/event.module");
const transaction_module_1 = require("./modules/transaction/transaction.module");
const upload_module_1 = require("./modules/upload/upload.module");
const mail_controller_1 = require("./modules/mail/mail.controller");
const mail_service_1 = require("./modules/mail/mail.service");
const mail_module_1 = require("./modules/mail/mail.module");
const task_module_1 = require("./modules/task/task.module");
const answer_module_1 = require("./modules/answer/answer.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            event_module_1.EventModule,
            transaction_module_1.TransactionModule,
            upload_module_1.UploadModule, config_1.ConfigModule, mail_module_1.MailModule, task_module_1.TaskModule, answer_module_1.AnswerModule, task_module_1.TaskModule
        ],
        controllers: [app_controller_1.AppController, mail_controller_1.MailController],
        providers: [app_service_1.AppService, mail_service_1.MailService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map