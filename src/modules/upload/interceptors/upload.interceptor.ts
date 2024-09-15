import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, switchMap } from 'rxjs';
import { UploadService } from '../services/upload.service';
import * as multer from 'multer';
import { Request, Response } from 'express';

@Injectable()
export class MulterS3Interceptor implements NestInterceptor {
  constructor(private readonly uploadService: UploadService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const multerS3Uploader = this.uploadService.getMulterS3Uploader();
    const upload = multer({ storage: multerS3Uploader.storage }).single('file');

    return new Observable(observer => {
      upload(request, response, err => {
        if (err) {
          observer.error(err);
        } else {
          observer.next();
          observer.complete();
        }
      });
    }).pipe(
      switchMap(() => next.handle()),
    );
  }
}
