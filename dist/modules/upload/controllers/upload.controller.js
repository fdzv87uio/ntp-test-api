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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const upload_service_1 = require("../services/upload.service");
const upload_interceptor_1 = require("../interceptors/upload.interceptor");
const has_role_decorator_1 = require("../../auth/decorators/has-role.decorator");
const role_enum_1 = require("../../auth/models/role.enum");
const roles_guard_1 = require("../../auth/guard/roles.guard");
const guard_1 = require("../../auth/guard");
const upload_file_dto_1 = require("../dtos/upload-file.dto");
let UploadController = class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
        this.multerS3Uploader = this.uploadService.getMulterS3Uploader().storage;
    }
    async uploadFile(file, body) {
        console.log(body.id);
        const result = await this.uploadService.uploadImage(file, body.id, body.site);
        return result;
    }
    async uploadFileNoWatermark(file, body) {
        console.log(body.id);
        const result = await this.uploadService.uploadImageNoWatermark(file, body.id);
        return result;
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, has_role_decorator_1.HasRoles)(role_enum_1.Role.Admin, role_enum_1.Role.User),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Upload an image file' }),
    (0, common_1.Post)('/image'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: upload_file_dto_1.UploadFileDto }),
    (0, common_1.UseInterceptors)(upload_interceptor_1.MulterS3Interceptor),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upload_file_dto_1.UploadFileDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
__decorate([
    (0, has_role_decorator_1.HasRoles)(role_enum_1.Role.Admin, role_enum_1.Role.User),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Upload an image file with no watermark' }),
    (0, common_1.Post)('/imageNoWatermark'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: upload_file_dto_1.UploadFileDto }),
    (0, common_1.UseInterceptors)(upload_interceptor_1.MulterS3Interceptor),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upload_file_dto_1.UploadFileDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFileNoWatermark", null);
exports.UploadController = UploadController = __decorate([
    (0, swagger_1.ApiTags)('Upload'),
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map