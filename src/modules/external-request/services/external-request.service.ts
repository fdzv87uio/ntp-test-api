import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { log } from 'console';

@Injectable()
export class ExternalRequestService {
    constructor(private readonly httpService: HttpService) {}
    
    getDataFromExternalApi(url: string,config: Record<string, any> = {} ): Observable<any> {
        return this.httpService.get(url,config)
          .pipe(
            map((response: AxiosResponse) => response.data),
            catchError(error => {
              log(`error get service ${error}`);
              throw new HttpException(error.response?.data || 'External API request failed', HttpStatus.BAD_REQUEST);
            })
          );
      }
    
      postDataToExternalApi(url: string, data: any,config: Record<string, any> = {}): Observable<any> {
        return this.httpService.post(url, data,config)
          .pipe(
            map((response: AxiosResponse) => response.data),
            catchError(error => {
              throw new HttpException(error.response?.data || 'External API request failed', HttpStatus.BAD_REQUEST);
            })
          );
      } 
}
