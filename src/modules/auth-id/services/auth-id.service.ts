import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ExternalRequestService } from '../../external-request/services/external-request.service';
import { AUTH_ID_CREATE_ACCOUNT_URL, AUTH_ID_OPERATION_URL, AUTH_ID_URL } from '../../common/constants/constants'
import { log } from 'console';
import { CreateAuthIdAccountDto } from '../dtos/create-Auth-id.dto';
import { isNotNullAndNotEmpty } from 'src/modules/common/utils/utils';
import { AuthIdResponse } from '../interfaces/auth-id.interface';
import { AuthIdTokenService } from './auth-id-token.service';
import { CreateAuthIdAccount } from '../dtos/create-auth-id-account.dto';
import { AuthIdAccount } from '../interfaces/auth-id-account.interface';
import * as QRCode from 'qrcode';

const { v4: uuidv4 } = require('uuid');

@Injectable()
export class AuthIdService {

  constructor(
    @InjectModel('AuthIdAccount') private readonly authIdAccountModel: Model<AuthIdAccount>,
    private readonly externalRequestService: ExternalRequestService,
    private readonly authIdTokenService: AuthIdTokenService
  ) {}

  async authid_login_send_sms(createAccount: CreateAuthIdAccountDto): Promise<AuthIdResponse> {
    try {
      const accessToken = await this.authIdTokenService.getAccessToken();
      if (accessToken) {
        const config = {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
          },
        }
        const accountNumber = uuidv4();
        const data = {
          "AccountNumber": accountNumber,
          "Version": 0,
          "DisplayName": createAccount.email,
          "CustomDisplayName": createAccount.email,
          "Description": createAccount.email,
          "Rules": 1,
          "Enabled": true,
          "Custom": true,
          "DisableReason": "",
          "Email": createAccount.email,
          "PhoneNumber": createAccount.phone,
          "EmailVerified": false,
          "PhoneNumberVerified": false
        }
        const responseAccount = await this.externalRequestService.postDataToExternalApi(AUTH_ID_CREATE_ACCOUNT_URL, data, config).toPromise();;
        log("response account ")
        log(responseAccount);
        if (isNotNullAndNotEmpty(responseAccount)) {          
          
            const payload = {
              "DocumentTypes": [
                "1002"
              ],
            }
            const dataOperation = {
              "AccountNumber": accountNumber,
              "Name": "GetForeignIDDocument",
              "Timeout": 36000,
              "TransportType": 0,
              "Tag": "",
              "Payload": payload
            }
            const resultOperation = await this.externalRequestService.postDataToExternalApi(AUTH_ID_OPERATION_URL, dataOperation, config).toPromise();
            log("result operation");
            log(resultOperation);
            if (isNotNullAndNotEmpty(resultOperation) && isNotNullAndNotEmpty(resultOperation['OneTimeSecret'])) {
              const oneTimeSecret = isNotNullAndNotEmpty(resultOperation['OneTimeSecret']) ? resultOperation['OneTimeSecret'] : "";
              const operationId = isNotNullAndNotEmpty(resultOperation['OperationId']) ? resultOperation['OperationId'] : "";
              const operationUrl = `${AUTH_ID_URL}/?i=${operationId}&s=${oneTimeSecret}`
              const qrCodeUrl = await QRCode.toDataURL(operationUrl);
              const data: CreateAuthIdAccount = {
                oneTimeSecret: oneTimeSecret,
                operationId: operationId,
                operationURL: operationUrl,
                qrcodeUrl: qrCodeUrl,
                name: createAccount.name,
                lastname: createAccount.lastname,
                accountNumber: accountNumber,
                email: createAccount.email,
                phone: createAccount.phone,
              }
              const authIdAccountCreated = await this.create(data);
              return {
                success: true,
                statusCode: "0",
                messageCode: "user account created",
                data: data
              } as unknown as AuthIdResponse;

            
          } else {
            return {
              success: false,
              statusCode: "-1",
              messageCode: "user account not saved",
              data: null
            } as unknown as AuthIdResponse;
          }
        } else {
          return {
            success: false,
            statusCode: "-1",
            messageCode: "user account not created",
            data: null
          } as unknown as AuthIdResponse;
        }
      } else {
        return {
          success: false,
          statusCode: "-2",
          messageCode: "AuthId access token not generated",
          data: null
        } as unknown as AuthIdResponse;
      }
    } catch (error) {
      log(`error sending sms ${error}`)
      throw new BadRequestException('Error sending SMS');
    }
  }

  async create(createAuthIdAccount: CreateAuthIdAccount): Promise<AuthIdAccount> {
    const result = await this.authIdAccountModel.findOne(createAuthIdAccount).exec();
    if (!result){
      log(createAuthIdAccount);
      return this.authIdAccountModel.create(createAuthIdAccount);
    }else {
      throw new NotFoundException(`authid Account exists`);
    }
  }

  async updateById(id: ObjectId, updateAuthIdAccount: CreateAuthIdAccount): Promise<AuthIdAccount> {
    try {
      const result = await this.findOne(id);
      if (!result) {
        throw new NotFoundException(`AuthID Account does not exist`);
      }
      Object.keys(updateAuthIdAccount).forEach((key) => {
        log(`Updating ${key} from ${result[key]} to ${updateAuthIdAccount[key]}`);
        result[key] = updateAuthIdAccount[key];
      });

      // Log the updated account data before saving
      log("Updated account before save =>", result);

      // Step 3: Save the updated account
      const updatedUser = await result.save();

      // Log the final updated account data
      log("Updated account after save =>", updatedUser);
      return {
        success: true,
        statusCode: "200",
        messageCode: "user updated successfully",
        data: updatedUser,
      } as unknown as AuthIdAccount;
    } catch (error) {
      log(`Error updating user: ${error}`);
      throw new BadRequestException('Error updating account');
    }
  }

  async findOne(id: ObjectId): Promise<AuthIdAccount> {
    try {
      const account = await this.authIdAccountModel.findById(id).exec()
      if (!account) throw new NotFoundException('User not found');
      return account;
    } catch (error) {
      log(`Error finding user: ${error}`);
      throw new NotFoundException('User not found');
    }
  }



}