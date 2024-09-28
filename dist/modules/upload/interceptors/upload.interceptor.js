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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterS3Interceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const upload_service_1 = require("../services/upload.service");
const multer = require("multer");
let MulterS3Interceptor = class MulterS3Interceptor {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const multerS3Uploader = this.uploadService.getMulterS3Uploader();
        const upload = multer({ storage: multerS3Uploader.storage }).single('file');
        return new rxjs_1.Observable(observer => {
            upload(request, response, err => {
                if (err) {
                    observer.error(err);
                }
                else {
                    observer.next();
                    observer.complete();
                }
            });
        }).pipe((0, rxjs_1.switchMap)(() => next.handle()));
    }
};
exports.MulterS3Interceptor = MulterS3Interceptor;
exports.MulterS3Interceptor = MulterS3Interceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], MulterS3Interceptor);
//# sourceMappingURL=upload.interceptor.js.map