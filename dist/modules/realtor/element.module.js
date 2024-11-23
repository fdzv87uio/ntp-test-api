"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const upload_module_1 = require("../upload/upload.module");
const element_schema_1 = require("./schemas/element.schema");
const user_schema_1 = require("../user/schemas/user.schema");
const user_service_1 = require("../user/services/user.service");
const element_controller_1 = require("./element.controller");
const realtor_service_1 = require("./realtor.service");
let ElementModule = class ElementModule {
};
exports.ElementModule = ElementModule;
exports.ElementModule = ElementModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Element', schema: element_schema_1.ElementSchema }, { name: 'User', schema: user_schema_1.UserSchema }]),
            upload_module_1.UploadModule],
        controllers: [element_controller_1.ElementController],
        providers: [realtor_service_1.ElementService, user_service_1.UserService]
    })
], ElementModule);
//# sourceMappingURL=element.module.js.map