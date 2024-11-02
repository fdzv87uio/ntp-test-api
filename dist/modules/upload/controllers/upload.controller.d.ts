import { UploadService } from '../services/upload.service';
import { UploadFileDto } from '../dtos/upload-file.dto';
export declare class UploadController {
    private readonly uploadService;
    private multerS3Uploader;
    constructor(uploadService: UploadService);
    uploadFile(file: Express.MulterFile, body: UploadFileDto): Promise<any>;
}
