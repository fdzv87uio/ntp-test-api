import axios from "axios";
import { promises as fs } from 'fs'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import * as sharp from 'sharp';
import * as path from 'path';

export async function uploadImageWithWatermark(img: any, id?: string) {
    try {
        const absolutePath = path.resolve('src/img/watermark.png');
        console.log(absolutePath);
        const watermark = await fs.readFile(absolutePath)
        const watermarkedImage: any = await sharp(img).composite([{ input: watermark, gravity: 'center' }]).toBuffer();
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
