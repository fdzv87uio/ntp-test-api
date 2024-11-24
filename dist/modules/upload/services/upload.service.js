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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const multer = require("multer");
const axios_1 = require("axios");
const fs_1 = require("fs");
const sharp = require("sharp");
const path = require("path");
let UploadService = class UploadService {
    constructor() {
    }
    getMulterS3Uploader() {
        return multer({
            storage: multer.memoryStorage(),
        });
    }
    async uploadImage(img, id, site) {
        try {
            console.log("Uploading Image...");
            const myApiKey = process.env.IMGBB_KEY;
            console.log("Key:");
            console.log(myApiKey);
            const imagePath = site === 'praedio' ? 'src/img/watermark-praedio.png' : 'src/img/watermark.png';
            const absolutePath = path.resolve(imagePath);
            console.log(absolutePath);
            const watermark = await fs_1.promises.readFile(absolutePath);
            const watermarkedImage = await sharp(img.buffer).resize(948, 705, {
                fit: sharp.fit.cover,
                position: sharp.strategy.entropy
            }).composite([{ input: watermark, gravity: 'center' }]).toBuffer();
            console.log(watermarkedImage);
            const formData = new FormData();
            formData.append("image", watermarkedImage.toString('base64'));
            console.log("form Data:");
            console.log(formData);
            const res = await axios_1.default.post(`https://api.imgbb.com/1/upload?key=${myApiKey}&name=${id}`, formData);
            console.log('***********************IMGBB DATA*******************************');
            console.log(res);
            const imageUrl = res.data.data.url;
            return {
                success: true,
                statusCode: 'Upload Successful',
                data: {
                    url: imageUrl,
                    signedurl: id
                }
            };
        }
        catch (error) {
            console.log(error.message);
            console.error('Error uploading file:', JSON.stringify(error, null, 2));
            return {
                success: false,
                statusCode: 'Upload Failed',
                error: error,
            };
        }
    }
    ;
    async uploadImageNoWatermark(img, id) {
        try {
            console.log("Uploading Image...");
            const myApiKey = process.env.IMGBB_KEY;
            console.log("Key:");
            console.log(myApiKey);
            const blob = new Blob([img.buffer]);
            const formData = new FormData();
            formData.append('image', blob);
            console.log("form Data:");
            console.log(formData);
            const res = await axios_1.default.post(`https://api.imgbb.com/1/upload?key=${myApiKey}&name=${id}`, formData);
            console.log('***********************IMGBB DATA*******************************');
            console.log(res);
            const imageUrl = res.data.data.url;
            return {
                success: true,
                statusCode: 'Upload Successful',
                data: {
                    url: imageUrl,
                    signedurl: id
                }
            };
        }
        catch (error) {
            console.log(error.message);
            console.error('Error uploading file:', JSON.stringify(error, null, 2));
            return {
                success: false,
                statusCode: 'Upload Failed',
                error: error,
            };
        }
    }
    ;
    async uploadImageWithWatermark(img, id) {
        try {
            const absolutePath = path.resolve('src/img/watermark.png');
            console.log(absolutePath);
            const watermark = await fs_1.promises.readFile(absolutePath);
            const watermarkedImage = await sharp(img).composite([{ input: watermark, gravity: 'center' }]).toBuffer();
            console.log(watermarkedImage);
            const myApiKey = process.env.IMGBB_KEY;
            const formData = new FormData();
            formData.append("image", watermarkedImage.toString('base64'));
            const { data } = await axios_1.default.post(`https://api.imgbb.com/1/upload?key=${myApiKey}&name=${id}`, formData);
            console.log("data");
            console.log(data);
            const imageUrl = data.data.url;
            return imageUrl;
        }
        catch (error) {
            console.log(error.message);
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadService);
//# sourceMappingURL=upload.service.js.map