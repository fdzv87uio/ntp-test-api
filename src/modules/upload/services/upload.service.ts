import { Injectable } from '@nestjs/common';
import * as multer from 'multer';
import axios from "axios";

@Injectable()
export class UploadService {

  constructor() {

  }

  getMulterS3Uploader() {
    return multer({
      storage: multer.memoryStorage(), // Use memory storage
    });
  }


  async uploadImage(img: Express.MulterFile, id: string) {
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
}