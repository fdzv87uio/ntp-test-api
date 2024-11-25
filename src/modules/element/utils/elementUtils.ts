import axios from "axios";
import { promises as fs } from 'fs'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import * as sharp from 'sharp';
import * as path from 'path';

export async function uploadImageWithWatermark(img: any, id?: string, site?: string) {
    try {
        const wmPath = site && site === "praedio" ? 'src/img/watermark-praedio.png' : 'src/img/watermark.png';
        const absolutePath = path.resolve(wmPath);
        console.log(absolutePath);
        const watermark = await fs.readFile(absolutePath)
        const flipped: any = await sharp(img).flop().resize(520, 410).toBuffer();
        const watermarkedImage: any = await sharp(flipped).composite([{ input: watermark, gravity: 'center' }]).toBuffer();
        console.log(watermarkedImage);
        const myApiKey = process.env.IMGBB_KEY;
        const formData = new FormData();
        formData.append("image", watermarkedImage.toString('base64'));
        const { data } = await axios.post(
            `https://api.imgbb.com/1/upload?key=${myApiKey}${id ? `&name=${id}` : ''}`,
            formData
        );
        console.log("data");
        console.log(data);
        const imageUrl = data.data.url;
        return imageUrl;
    } catch (error) {
        console.log(error.message);
    }
}

export async function uploadImageWithWatermarkNoScale(img: any, id?: string, site?: string) {
    try {
        const wmPath = site && site === "praedio" ? 'src/img/watermark-praedio.png' : 'src/img/watermark.png';
        const absolutePath = path.resolve(wmPath);
        console.log(absolutePath);
        const watermark = await fs.readFile(absolutePath)
        const flipped: any = await sharp(img).toBuffer();
        const watermarkedImage: any = await sharp(flipped).composite([{ input: watermark, gravity: 'center' }]).toBuffer();
        console.log(watermarkedImage);
        const myApiKey = process.env.IMGBB_KEY;
        const formData = new FormData();
        formData.append("image", watermarkedImage.toString('base64'));
        const { data } = await axios.post(
            `https://api.imgbb.com/1/upload?key=${myApiKey}${id ? `&name=${id}` : ''}`,
            formData
        );
        console.log("data");
        console.log(data);
        const imageUrl = data.data.url;
        return imageUrl;
    } catch (error) {
        console.log(error.message);
    }
}

