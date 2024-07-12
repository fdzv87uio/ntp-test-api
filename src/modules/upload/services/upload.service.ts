import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import * as multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { log } from 'console';

@Injectable()
export class UploadService {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  getMulterS3Uploader() {
    return multer({
      storage: multer.memoryStorage(), // Use memory storage
    });
  }

  async uploadFile(file: Buffer): Promise<any> {
    try {
       const loadId =  uuidv4();      
      const key = `${loadId}-${Date.now().toString()}`
      const params: PutObjectCommandInput = {
        Bucket: process.env.AWS_IMAGE_BUCKET_NAME,
        Key: key,
        Body: file,
        ContentType: 'image/jpeg',
        ContentDisposition: 'inline',
        // ACL: 'public-read',
      };

      try {
        const command = new PutObjectCommand(params);
        const data = await this.s3Client.send(command);       
        return {
          success: true,
          statusCode: 'success upload',
          data: {
            url: `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`
          }          
        };
      } catch (error) {
        console.error('Error uploading file:', JSON.stringify(error, null, 2));
        throw new Error(`File upload failed. ${error.message}`);
      }
    } catch (error) {
      console.error('Error uploading file:', JSON.stringify(error, null, 2));
      throw new Error(`File upload failed. ${error.message}`);
    }
  }
}