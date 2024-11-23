"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtorModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const upload_module_1 = require("../upload/upload.module");
const realtor_schema_1 = require("./schemas/realtor.schema");
const realtor_controller_1 = require("./realtor.controller");
const realtor_service_1 = require("./realtor.service");
let RealtorModule = class RealtorModule {
};
exports.RealtorModule = RealtorModule;
exports.RealtorModule = RealtorModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Realtor', schema: realtor_schema_1.RealtorSchema }]),
            upload_module_1.UploadModule],
        controllers: [realtor_controller_1.RealtorController],
        providers: [realtor_service_1.RealtorService]
    })
], RealtorModule);
//# sourceMappingURL=realtor.module.js.map