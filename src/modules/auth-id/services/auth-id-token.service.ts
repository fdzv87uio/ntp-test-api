import { BadRequestException, Injectable,  NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { AuthIdToken } from '../interfaces/auth-id-token.interface';
import { ExternalRequestService } from '../../external-request/services/external-request.service';
import { AUTH_ID_TOKEN_URL, AUTH_ID_REFRESH_TOKEN_URL } from '../../common/constants/constants'
import { log } from 'console';
import { CreateAuthIdToken } from '../dtos/create-Auth-id-token.dto';
import { isNotNullAndNotEmpty } from 'src/modules/common/utils/utils';
import { UpdateAuthIdToken } from '../dtos/update-auth-id-token.dto';


@Injectable()
export class AuthIdTokenService { 
  
    constructor(
        @InjectModel('AuthIdToken') private readonly authIdTokenModel: Model<AuthIdToken>,      
         private readonly externalRequestService: ExternalRequestService,
                  
    ) {}    

    async getAccessToken ()  {          
      log("get access ");
      let authidToken = await this.find();
      log("token "+ authidToken);
      if (isNotNullAndNotEmpty(authidToken)){
        const url = AUTH_ID_REFRESH_TOKEN_URL;
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',                        
          },
        }
        const data = JSON.stringify(authidToken.refreshToken);
        log("data");
        log(data);
        const response = await this.externalRequestService.postDataToExternalApi(url,data,config).toPromise();        
       log(response);
        if(isNotNullAndNotEmpty(response) && isNotNullAndNotEmpty(response["AccessToken"])){
          try {
             authidToken.accessToken = isNotNullAndNotEmpty(response["AccessToken"])?response["AccessToken"]:'';
             authidToken.accessTokenExpirationDate = isNotNullAndNotEmpty(response["AccessTokenExpirationDate"])?response["AccessTokenExpirationDate"]:null;
             authidToken.expiresIn = isNotNullAndNotEmpty(response["ExpiresIn"])?response["ExpiresIn"]:'';
             authidToken.refreshToken = isNotNullAndNotEmpty(response["RefreshToken"])?response["RefreshToken"]:'';
            log(authidToken);
            this.delete(authidToken.id);
            return authidToken.accessToken;             
          } catch (error) {            
            error("Failed to parse JSON string:", error);
            throw new NotFoundException(`authIdTokenId  not found`);
          }
        }else{
          return null;
        }
      }else{
        log("get Token");
        const externalId = process.env.EXTERNAL_ID;
        const apiKey = process.env.API_KEY;
        const authorization = btoa(`${externalId}:${apiKey}`);       
        const url = AUTH_ID_TOKEN_URL;
        const config = {
          headers: {
            'Authorization': `Basic ${authorization}`,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',                        
          },
        }
        const data = [];                
        const response = await this.externalRequestService.postDataToExternalApi(url,data,config).toPromise();        
        log(response["AccessToken"]);
        if(isNotNullAndNotEmpty(response) && isNotNullAndNotEmpty(response["AccessToken"])){
          try {
            let authidToken = new CreateAuthIdToken();            
             authidToken.accessToken = isNotNullAndNotEmpty(response["AccessToken"])?response["AccessToken"]:'';
             authidToken.accessTokenExpirationDate = isNotNullAndNotEmpty(response["AccessTokenExpirationDate"])?response["AccessTokenExpirationDate"]:null;
             authidToken.expiresIn = isNotNullAndNotEmpty(response["ExpiresIn"])?response["ExpiresIn"]:'';
             authidToken.refreshToken = isNotNullAndNotEmpty(response["RefreshToken"])?response["RefreshToken"]:'';
             authidToken.userExternalId = isNotNullAndNotEmpty(response["UserExternalId"])?response["UserExternalId"]:'';
            log(authidToken);
            this.create(authidToken);
            return authidToken.accessToken;             
          } catch (error) {            
            log("Failed to parse JSON string:", error);
            throw new NotFoundException(`authIdTokenId  not found`);
          }
      }else{
        return null;
      }
    }
  }

    async find(): Promise<AuthIdToken> {
      return this.authIdTokenModel.findOne().exec();
    }
    
    async create(createAuthIdToken: CreateAuthIdToken): Promise<AuthIdToken> {
      const result = await this.authIdTokenModel.findOne(createAuthIdToken).exec();
      if(!result)
       return this.authIdTokenModel.create(createAuthIdToken);
      else{
        throw new NotFoundException(`authid Token exists`);
      }      
    }

    async updateAuthIdToken(authIdTokenId: String, updateAuthIdTokenDto: UpdateAuthIdToken): Promise<AuthIdToken> {
      const updatedAuthIdToken = await this.authIdTokenModel
        .findByIdAndUpdate(authIdTokenId, updateAuthIdTokenDto, { new: true })
        .exec();
      if (!updatedAuthIdToken) {
        throw new NotFoundException(`authIdTokenId with ID ${authIdTokenId} not found`);
      }
      return updatedAuthIdToken;
    }

    async delete(id: ObjectId): Promise<void> {
      const result = await this.authIdTokenModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`userExternalId ${id} not found`);
      }
    }
    
    
}
