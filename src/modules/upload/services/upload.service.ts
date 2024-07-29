import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, PutObjectCommandInput, DeleteObjectCommand, DeleteObjectCommandInput, CreateMultipartUploadCommand, CompletedPart, UploadPartCommand, CompleteMultipartUploadCommand } from '@aws-sdk/client-s3';
import * as multer from 'multer';
import { Readable } from 'stream';
import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner';
import * as crypto from 'crypto';
import { Hash } from "@smithy/hash-node";
import { HttpRequest } from '@smithy/protocol-http';
import { parseUrl } from "@smithy/url-parser";
import { formatUrl } from "@aws-sdk/util-format-url";
import { log } from 'console';

@Injectable()
export class UploadService {
  private bucketName: string;
  private region: string;
  private s3Client: S3Client;
  private presigner: S3RequestPresigner;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    this.presigner = new S3RequestPresigner({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      region: process.env.AWS_REGION,
      sha256: Hash.bind(null, "sha256"),
    });
    this.bucketName = process.env.AWS_IMAGE_BUCKET_NAME;
    this.region = process.env.AWS_REGION;
  }

  getMulterS3Uploader() {
    return multer({
      storage: multer.memoryStorage(), // Use memory storage
    });
  }

  async uploadFile(file: Express.MulterFile, eventId: string): Promise<any> {
    const key_ = `${eventId}/image/${Date.now().toString()}-${file.originalname}`;
    try {
      const params: PutObjectCommandInput = {
        Bucket: this.bucketName,
        Key: key_,
        Body: file.buffer,
        ContentType: file.mimetype
        // ACL: 'public-read',
      };

      try {
        const command = new PutObjectCommand(params);
        await this.s3Client.send(command);
        const url_ = `https://${params.Bucket}.s3.${this.region}.amazonaws.com/${params.Key}`
        const signedUrl_ = await this.createPresignedUrl(url_);
        return {
          success: true,
          statusCode: 'success upload',
          data: {
            url: url_,
            signedurl: signedUrl_
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

  async uploadVideoFile(file: Express.MulterFile, eventId: string): Promise<any> {
    const _key = `${eventId}/video/${Date.now().toString()}-${file.originalname}`;

    try {
      const createMultipartUploadCommand = new CreateMultipartUploadCommand({
        Bucket: this.bucketName,
        Key: _key,
        ContentType: file.mimetype,
      });
      const createMultipartUploadResponse = await this.s3Client.send(createMultipartUploadCommand);
      const uploadId = createMultipartUploadResponse.UploadId;
      const partSize = 5 * 1024 * 1024; // 5 MB part size
      const fileStream = Readable.from(file.buffer);
      const parts: CompletedPart[] = [];

      let partNumber = 1;
      let bytesRead = 0;
      let partBuffer = Buffer.alloc(0);

      for await (const chunk of fileStream) {
        partBuffer = Buffer.concat([partBuffer, chunk]);
        bytesRead += chunk.length;

        if (bytesRead >= partSize) {
          const uploadPartCommand = new UploadPartCommand({
            Bucket: this.bucketName,
            Key: _key,
            UploadId: uploadId,
            PartNumber: partNumber,
            Body: partBuffer,
          });
          const uploadPartResponse = await this.s3Client.send(uploadPartCommand);
          parts.push({ PartNumber: partNumber, ETag: uploadPartResponse.ETag });
          partNumber++;
          partBuffer = Buffer.alloc(0);
          bytesRead = 0;
        }
      }

      // Upload the last part
      if (bytesRead > 0) {
        const uploadPartCommand = new UploadPartCommand({
          Bucket: this.bucketName,
          Key: _key,
          UploadId: uploadId,
          PartNumber: partNumber,
          Body: partBuffer,
        });
        const uploadPartResponse = await this.s3Client.send(uploadPartCommand);
        parts.push({ PartNumber: partNumber, ETag: uploadPartResponse.ETag });
      }

      const completeMultipartUploadCommand = new CompleteMultipartUploadCommand({
        Bucket: this.bucketName,
        Key: _key,
        UploadId: uploadId,
        MultipartUpload: { Parts: parts },
      });
      await this.s3Client.send(completeMultipartUploadCommand);

      const url_ = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${_key}`
      const signedUrl_ = await this.createPresignedUrl(url_);
      return {
        success: true,
        statusCode: 'success upload',
        data: {
          url: url_,
          signedurl: signedUrl_
        },
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error(`File upload failed. ${error.message}`);
    }
  }

  async deleteUpload(url: string) {
    try {
      const delparams: DeleteObjectCommandInput = {
        Bucket: this.bucketName,
        Key: url,
      };
      try {
        const command = new DeleteObjectCommand(delparams);
        const data = await this.s3Client.send(command);
        return {
          success: true,
          statusCode: 'success delete',
          data: data
        };
      } catch (error) {
        console.error('Error uploading file:', JSON.stringify(error, null, 2));
        throw new Error(`File upload failed. ${error.message}`)
      }
    } catch (error) {
      throw new Error(`File upload failed. ${error.message}`);
    }
  }

  async createPresignedUrl(urlsimple: string): Promise<string> {
    const url = parseUrl(urlsimple)
    const expiresIn : number = 604800
    const signedUrlObject = await this.presigner.presign(new HttpRequest(url),{expiresIn});
    const response = formatUrl(signedUrlObject)    
    return response;
  }
}