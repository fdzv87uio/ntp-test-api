import { BadRequestException, Injectable,  NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { AuthIdToken } from '../interfaces/auth-id-token.interface';
import { ExternalRequestService } from '../../external-request/services/external-request.service'; 
import { AUTH_ID_TOKEN_URL, AUTH_ID_REFRESH_TOKEN_URL, AUTH_ID_CREATE_ACCOUNT_URL, AUTH_ID_OPERATION_URL } from '../../common/constants/constants'
import { log } from 'console';
import { CreateAuthIdAccountDto } from '../dtos/create-Auth-id.dto';
import { isNotNullAndNotEmpty } from 'src/modules/common/utils/utils';
import { UpdateAuthIdToken } from '../dtos/update-auth-id-token.dto';
import { AuthIdResponse } from '../interfaces/auth-id.interface';
import { AuthIdResponses } from '../dtos/respose-auth-id-response.dto';
import { AuthIdTokenService } from './auth-id-token.service';
import { CreateAuthIdAccount } from '../dtos/create-auth-id-account.dto';
import { AuthIdAccount} from '../interfaces/auth-id-account.interface';

const { v4: uuidv4 } = require('uuid');

@Injectable()
export class AuthIdService { 
  
    constructor(       
        @InjectModel('AuthIdAccount') private readonly authIdAccountModel: Model<AuthIdAccount>,      
         private readonly externalRequestService: ExternalRequestService,
         private readonly authIdTokenService: AuthIdTokenService         
    ) {} 

    async authid_login_send_sms(createAccount: CreateAuthIdAccountDto):Promise<AuthIdResponse>{
        try{
           const accessToken =  this.authIdTokenService.getAccessToken();
           if(!accessToken){             
            const config = {
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': '*/*',
                  'Accept-Encoding': 'gzip, deflate, br',                        
                },
              }
              const accountNumber  = uuidv4();
            const data = {                
                "AccountNumber": accountNumber,
                "Version" :  0,
                "DisplayName": createAccount.email,
                "CustomDisplayName": createAccount.email,
                "Description": createAccount.email,
                "Rules" : 1,
                "Enabled" : true,
                "Custom": true,
                "DisableReason":"",
                "Email":createAccount.email,
                "PhoneNumber":createAccount.phone,
                "EmailVerified": false,
                "PhoneNumberVerified":false
            }  
            const responseAccount = await this.externalRequestService.postDataToExternalApi(AUTH_ID_CREATE_ACCOUNT_URL,data,config);
            if(isNotNullAndNotEmpty(responseAccount) && isNotNullAndNotEmpty(responseAccount["AccountNumber"])){
              const createAuthIdAccount: CreateAuthIdAccount={
                name: createAccount.name,
                lastname: createAccount.lastname,
                accountNumber: responseAccount["AccountNumber"],
                email: createAccount.email,
                phone: createAccount.phone,
                oneTimeSecret: null,
                OperationId: null,
                operationURL: null,
                qrcodeUrl:null
              }
               const authIdAccountCreated =  this.create(createAuthIdAccount);
               if(isNotNullAndNotEmpty((await authIdAccountCreated).id)){
                const payload = { 
                  "DocumentTypes": [
                    "1002"
                  ],
                }
                const dataOperation = { 
                  "AccountNumber":accountNumber,
						  	  "Name" : "GetForeignIDDocument",
						  	  "Timeout": 36000,
						  	  "TransportType": 0,
						  	  "Tag": "",
						  	  "Payload" : payload
                }
                const resultOperation = await  this.externalRequestService.postDataToExternalApi(AUTH_ID_OPERATION_URL,dataOperation,config);
                if(isNotNullAndNotEmpty(resultOperation) && isNotNullAndNotEmpty(resultOperation['OneTimeSecret'])){
                    return null;
                }
              }else{
                return {
                  success: false,
                  statusCode: "-1",
                  messageCode: "user account not saved",
                  data: null
                } as unknown as AuthIdResponse;
              }
            }else{
              return {
                success: false,
                statusCode: "-1",
                messageCode: "user account not created",
                data: null
              } as unknown as AuthIdResponse;
           }
          }else{
            return {
              success: false,
              statusCode: "-2",
              messageCode: "AuthId access token not generated",
              data: null
            } as unknown as AuthIdResponse;
          }
        }catch(error){
            log(`error sending sms ${error}`)
            throw new BadRequestException('Error sending SMS');
        }    
    }
    
    async create(createAuthIdAccount: CreateAuthIdAccount): Promise<AuthIdAccount> {
        const result = await this.authIdAccountModel.findOne(createAuthIdAccount).exec();
        if(!result)
         return this.authIdAccountModel.create(createAuthIdAccount);
        else{
          throw new NotFoundException(`authid Account exists`);
        }      
     }

     async updateById(id:ObjectId,updateAuthIdAccount: CreateAuthIdAccount): Promise<AuthIdAccount> {
      try{
      const result = await this.findOne(id);
      if(!result){   throw new NotFoundException(`authid Account exists`); } 
      Object.assign(result, updateAuthIdAccount); 
      const updatedUser = await result.save();
      return {
        success: true,
        statusCode: "200",
        messageCode: "user updated successfully",
        data: updatedUser,
      } as unknown as AuthIdAccount;
     }catch(error){
       log(`Error updating user: ${error}`);
       throw new BadRequestException('Error updating account');
     }
    }
    
    async findOne(id: ObjectId): Promise<AuthIdAccount> {    
      const account = this.authIdAccountModel.findById({id: id}).exec()
      if(!account)  throw new NotFoundException('User not found');
      return account; 
    }



}