import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UploadService } from '../services/upload.service';
export declare class MulterS3Interceptor implements NestInterceptor {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
