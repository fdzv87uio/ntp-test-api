"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageWithWatermark = uploadImageWithWatermark;
const axios_1 = require("axios");
const fs_1 = require("fs");
const sharp = require("sharp");
const path = require("path");
async function uploadImageWithWatermark(img, id, site) {
    try {
        const wmPath = site && site === "praedio" ? 'src/img/watermark-praedio.png' : 'src/img/watermark.png';
        const absolutePath = path.resolve(wmPath);
        console.log(absolutePath);
        const watermark = await fs_1.promises.readFile(absolutePath);
        const flipped = await sharp(img).flop().resize(520, 410).toBuffer();
        const watermarkedImage = await sharp(flipped).composite([{ input: watermark, gravity: 'center' }]).toBuffer();
        console.log(watermarkedImage);
        const myApiKey = process.env.IMGBB_KEY;
        const formData = new FormData();
        formData.append("image", watermarkedImage.toString('base64'));
        const { data } = await axios_1.default.post(`https://api.imgbb.com/1/upload?key=${myApiKey}${id ? `&name=${id}` : ''}`, formData);
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