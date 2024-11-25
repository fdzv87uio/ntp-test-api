import { Injectable } from '@nestjs/common';
import * as multer from 'multer';
import axios from "axios";
import { promises as fs } from 'fs'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import * as sharp from 'sharp';
import * as path from 'path';






@Injectable()
export class UploadService {

  constructor() {

  }

  getMulterS3Uploader() {
    return multer({
      storage: multer.memoryStorage(), // Use memory storage
    });
  }


  async uploadImage(img: Express.MulterFile, id: string, site?: string) {
    try {
      console.log("Uploading Image...")
      const myApiKey = process.env.IMGBB_KEY;
      console.log("Key:");
      console.log(myApiKey);
      //Add watermark
      const imagePath = site === 'praedio' ? 'src/img/watermark-praedio.png' : 'src/img/watermark.png';
      const absolutePath = path.resolve(imagePath);
      console.log(absolutePath);
      const watermark = await fs.readFile(absolutePath)
      const watermarkedImage: any = await sharp(img.buffer).resize(948, 705, {
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy
      }).composite([{ input: watermark, gravity: 'center' }]).toBuffer();
      console.log(watermarkedImage);
      // const blob = new Blob([img.buffer]); // JavaScript Blob
      const formData = new FormData();
      formData.append("image", watermarkedImage.toString('base64'));
      // formData.append('image', blob);
      console.log("form Data:")
      console.log(formData)
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${myApiKey}&name=${id}`, formData)
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
    } catch (error: any) {
      console.log(error.message);
      console.error('Error uploading file:', JSON.stringify(error, null, 2));
      return {
        success: false,
        statusCode: 'Upload Failed',
        error: error,
      };
    }
  };

  async uploadImageNoRescale(img: Express.MulterFile, id: string, site?: string) {
    try {
      console.log("Uploading Image...")
      const myApiKey = process.env.IMGBB_KEY;
      console.log("Key:");
      console.log(myApiKey);
      //Add watermark
      const imagePath = site === 'praedio' ? 'src/img/watermark-praedio.png' : 'src/img/watermark.png';
      const absolutePath = path.resolve(imagePath);
      console.log(absolutePath);
      const watermark = await fs.readFile(absolutePath)
      const watermarkedImage: any = await sharp(img.buffer).composite([{ input: watermark, gravity: 'center' }]).toBuffer();
      console.log(watermarkedImage);
      // const blob = new Blob([img.buffer]); // JavaScript Blob
      const formData = new FormData();
      formData.append("image", watermarkedImage.toString('base64'));
      // formData.append('image', blob);
      console.log("form Data:")
      console.log(formData)
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${myApiKey}&name=${id}`, formData)
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
    } catch (error: any) {
      console.log(error.message);
      console.error('Error uploading file:', JSON.stringify(error, null, 2));
      return {
        success: false,
        statusCode: 'Upload Failed',
        error: error,
      };
    }
  };

  async uploadImageNoWatermark(img: Express.MulterFile, id: string) {
    try {
      console.log("Uploading Image...")
      const myApiKey = process.env.IMGBB_KEY;
      console.log("Key:");
      console.log(myApiKey);
      const blob = new Blob([img.buffer]); // JavaScript Blob
      const formData = new FormData();
      formData.append('image', blob);
      console.log("form Data:")
      console.log(formData)
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${myApiKey}&name=${id}`, formData)
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
    } catch (error: any) {
      console.log(error.message);
      console.error('Error uploading file:', JSON.stringify(error, null, 2));
      return {
        success: false,
        statusCode: 'Upload Failed',
        error: error,
      };
    }
  };

  async uploadImageWithWatermark(img: any, id: string) {
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
        `https://api.imgbb.com/1/upload?key=${myApiKey}&name=${id}`,
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

}