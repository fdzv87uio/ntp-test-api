import { UploadService } from '../services/upload.service';
import { UploadFileDto } from '../dtos/upload-file.dto';
export declare class UploadController {
    private readonly uploadService;
    private multerS3Uploader;
    constructor(uploadService: UploadService);
    uploadFile(file: Express.MulterFile, body: UploadFileDto): Promise<{
        success: boolean;
        statusCode: string;
        data: {
            url: any;
            signedurl: string;
        };
        error?: undefined;
    } | {
        success: boolean;
        statusCode: string;
        error: any;
        data?: undefined;
    }>;
    uploadFileNoWatermark(file: Express.MulterFile, body: UploadFileDto): Promise<{
        success: boolean;
        statusCode: string;
        data: {
            url: any;
            signedurl: string;
        };
        error?: undefined;
    } | {
        success: boolean;
        statusCode: string;
        error: any;
        data?: undefined;
    }>;
}
