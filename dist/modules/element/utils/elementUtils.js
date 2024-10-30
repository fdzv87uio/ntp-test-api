"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageWithWatermark = uploadImageWithWatermark;
const axios_1 = require("axios");
const fs_1 = require("fs");
const sharp = require("sharp");
const path = require("path");
async function uploadImageWithWatermark(img) {
    try {
        const absolutePath = path.resolve('src/img/watermark.png');
        console.log(absolutePath);
        const watermark = await fs_1.promises.readFile(absolutePath);
        const watermarkedImage = await sharp(img).composite([{ input: watermark, gravity: 'center' }]).toBuffer();
        console.log(watermarkedImage);
        const myApiKey = process.env.IMGBB_KEY;
        const formData = new FormData();
        formData.append("image", watermarkedImage.toString('base64'));
        const { data } = await axios_1.default.post(`https://api.imgbb.com/1/upload?key=${myApiKey}`, formData);
        console.log("data");
        console.log(data);
        const imageUrl = data.data.url;
        return imageUrl;
    }
    catch (error) {
        console.log(error.message);
    }
}
//# sourceMappingURL=elementUtils.js.map