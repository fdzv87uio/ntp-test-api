import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import * as multer from 'multer';
import { Request } from 'express';
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

  async uploadFile(file: Buffer, eventId: string): Promise<any> {
    log(eventId);
    const key = `${eventId}/${Date.now().toString()}-${eventId}`
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
        url: `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`,
        ...data,
      };
    } catch (error) {
      console.error('Error uploading file:', JSON.stringify(error, null, 2));
      throw new Error(`File upload failed. ${error.message}`);
    }
  }
}