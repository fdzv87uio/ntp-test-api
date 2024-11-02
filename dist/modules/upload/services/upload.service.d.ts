export declare class UploadService {
    constructor();
    getMulterS3Uploader(): any;
    uploadImage(img: Express.MulterFile, id: string): Promise<{
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
    uploadImageWithWatermark(img: any, id: string): Promise<any>;
}
