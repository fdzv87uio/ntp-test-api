import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ExternalRequestService } from '../../external-request/services/external-request.service';
import { AUTH_ID_CREATE_ACCOUNT_URL, AUTH_ID_FOREING_OPERATIONS_URL, AUTH_ID_OPERATION_ENROLL_URL, AUTH_ID_OPERATION_VERIFY_URL, AUTH_ID_URL } from '../../common/constants/constants'
import { log } from 'console';
import { AuthIdAccountDto } from '../dtos/auth-id_dto.dto';
import { isNotNullAndNotEmpty } from 'src/modules/common/utils/utils';
import { AuthIdResponse } from '../interfaces/auth-id.interface';
import { AuthIdTokenService } from './auth-id-token.service';
import { CreateAuthIdAccount } from '../dtos/create-auth-id-account.dto';
import { AuthIdAccount } from '../interfaces/auth-id-account.interface';
import * as QRCode from 'qrcode';
import { AuthIdCompleteEnrollDto } from '../dtos/auth-id-complete-enroll.dto';
import { AuthIdCheckOperationDto } from '../dtos/auth-id-check-operation.dto';

const { v4: uuidv4 } = require('uuid');

@Injectable()
export class AuthIdService {

  constructor(
    @InjectModel('AuthIdAccount') private readonly authIdAccountModel: Model<AuthIdAccount>,
    private readonly externalRequestService: ExternalRequestService,
    private readonly authIdTokenService: AuthIdTokenService
  ) {}

  async authid_Enrollment_Document(createAccount: AuthIdAccountDto): Promise<AuthIdResponse> {
    try {
      const accessToken = await this.authIdTokenService.getAccessToken();
      if (accessToken) {
        const responseAccount = await this.create_account(accessToken, createAccount);
        if (isNotNullAndNotEmpty(responseAccount)) {
          const accountNumber = responseAccount.data["AccountNumber"];
          const config = {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
              'Accept': '*/*',
              'Accept-Encoding': 'gzip, deflate, br',
            },
          }
          const payload = {
            "DocumentTypes": [
              createAccount.documentType
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
          const resultOperation = await this.externalRequestService.postDataToExternalApi(AUTH_ID_OPERATION_ENROLL_URL, dataOperation, config).toPromise();
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
              transactionType: "enrollment",
              status: "pending",
              documentType: createAccount.documentType
            }
            const authIdAccountCreated = await this.create(data);
            return {
              success: true,
              statusCode: "0",
              messageCode: "transaction enroll created",
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
      throw new BadRequestException('Error enroll Document');
    }
  }

  async authid_Enrollment_Face(createAccount: AuthIdAccountDto): Promise<AuthIdResponse> {
    try {
      const accessToken = await this.authIdTokenService.getAccessToken();
      if (accessToken) {
        const responseAccount = await this.create_account(accessToken, createAccount);
        if (isNotNullAndNotEmpty(responseAccount)) {
          log("response account");
          log(responseAccount)
          const accountNumber = responseAccount.data["AccountNumber"];
          log(`accountnumber ${accountNumber}`)
          const config = {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
              'Accept': '*/*',
              'Accept-Encoding': 'gzip, deflate, br',
            },
          }
          const dataOperation = {
            "AccountNumber": accountNumber,
            "Name": "EnrollBioCredential",
            "Timeout": 36000,
            "TransportType": 0,
            "Tag": "",
          }
          const resultFace = await this.externalRequestService.postDataToExternalApi(AUTH_ID_OPERATION_ENROLL_URL, dataOperation, config).toPromise();
          log("result operation");
          log(resultFace);
          if (isNotNullAndNotEmpty(resultFace) && isNotNullAndNotEmpty(resultFace['OneTimeSecret'])) {
            const oneTimeSecret = isNotNullAndNotEmpty(resultFace['OneTimeSecret']) ? resultFace['OneTimeSecret'] : "";
            const operationId = isNotNullAndNotEmpty(resultFace['OperationId']) ? resultFace['OperationId'] : "";
            const operationUrl = `${AUTH_ID_URL}/?i=${operationId}&s=${oneTimeSecret}`
            const qrCodeUrl = await QRCode.toDataURL(operationUrl);
            let data: CreateAuthIdAccount = {
              oneTimeSecret: oneTimeSecret,
              operationId: operationId,
              operationURL: operationUrl,
              qrcodeUrl: qrCodeUrl,
              name: createAccount.name,
              lastname: createAccount.lastname,
              accountNumber: accountNumber,
              email: createAccount.email,
              phone: createAccount.phone,
              transactionType: "enrollment",
              status: "pending",
              documentType: null
            }
            await this.create(data);
            return {
              success: true,
              statusCode: "0",
              messageCode: "transaction enroll created",
              data: data
            } as unknown as AuthIdResponse;

          } else {
            return {
              success: false,
              statusCode: "-1",
              messageCode: "transaction no created",
              data: null
            } as unknown as AuthIdResponse;
          }
        } else {
          return {
            success: false,
            statusCode: "-1",
            messageCode: "token no created",
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
    } catch (error) {
      log(`error create enroll face ${error}`)
      throw new BadRequestException('Error enroll face');
    }
  }



  async authid_complete_enrollment(completeEnroll: AuthIdCompleteEnrollDto): Promise<AuthIdResponse> {
    try {
      const accessToken = await this.authIdTokenService.getAccessToken();
      if (isNotNullAndNotEmpty(accessToken)) {
        const account = await this.findEmail(completeEnroll.email);
        if (isNotNullAndNotEmpty(account)) {
          const config = {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Accept': 'application/json',
              'Accept-Encoding': 'gzip, deflate, br',
            },
          }
          const urlForeingOperation = `${AUTH_ID_FOREING_OPERATIONS_URL}/${account.operationId}`;
          log(urlForeingOperation);
          const resultOperation = await this.externalRequestService.getDataFromExternalApi(urlForeingOperation, config).toPromise();
          log(resultOperation);
          if (isNotNullAndNotEmpty(resultOperation)) {
            const tempId = isNotNullAndNotEmpty(resultOperation["TempId"]) ? resultOperation["TempId"] : "";
            const oneTimeSecret = isNotNullAndNotEmpty(resultOperation["OneTimeSecret"]) ? resultOperation["OneTimeSecret"] : "";
            const data = {
              "TempId": tempId,
            }
            const biometricUrl = `${AUTH_ID_CREATE_ACCOUNT_URL}/${account.accountNumber}/proofedBioCredential`;
            log(`biometricurl ${biometricUrl}`);
            await this.externalRequestService.postDataToExternalApi(biometricUrl, data, config).toPromise();

            return {
              success: false,
              statusCode: "0",
              messageCode: "Operation complete",
              data: undefined
            } as unknown as AuthIdResponse;

          } else {
            return {
              success: false,
              statusCode: "-1",
              messageCode: "Operation not response",
              data: null
            } as unknown as AuthIdResponse;
          }
        } else {
          return {
            success: false,
            statusCode: "-1",
            messageCode: "account not found",
            data: null
          } as unknown as AuthIdResponse;
        }
      } else {
        return {
          success: false,
          statusCode: "-3",
          messageCode: "token not generated",
          data: null
        } as unknown as AuthIdResponse;
      }
    } catch (error) {
      log(`error completing enrollment ${error}`);
      throw new BadRequestException('Error completing enrollment');
    }

  }

  async authid_Verification(createAccount: AuthIdAccountDto): Promise<AuthIdResponse> {
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
        const account = await this.findEmail(createAccount.email);
        if (isNotNullAndNotEmpty(account)) {
          const accountNumber = account.accountNumber
          const confirmationPolicy = { "TransportType": 0, "CredentialType": 1 };
          const dataOperation = {
            "AccountNumber": accountNumber,
            "Name": "Verify_Identity",
            "Timeout": 36000,
            "ConfirmationPolicy": confirmationPolicy
          }
          log(dataOperation);
          const resultOperation = await this.externalRequestService.postDataToExternalApi(AUTH_ID_OPERATION_VERIFY_URL, dataOperation, config).toPromise();
          log("result operation");
          log(resultOperation);
          if (isNotNullAndNotEmpty(resultOperation) && isNotNullAndNotEmpty(resultOperation['OneTimeSecret'])) {
            const oneTimeSecret = isNotNullAndNotEmpty(resultOperation['OneTimeSecret']) ? resultOperation['OneTimeSecret'] : "";
            const transactionId = isNotNullAndNotEmpty(resultOperation['TransactionId']) ? resultOperation['TransactionId'] : "";
            const logo = 'White-Logo.png';
            const operationUrl = `${AUTH_ID_URL}/?t=${transactionId}&s=${oneTimeSecret}`;//'&CID='${logo}'`
            const qrCodeUrl = await QRCode.toDataURL(operationUrl);
            const data: CreateAuthIdAccount = {
              oneTimeSecret: oneTimeSecret,
              operationId: transactionId,
              operationURL: operationUrl,
              qrcodeUrl: qrCodeUrl,
              name: account.name,
              lastname: account.lastname,
              accountNumber: accountNumber,
              email: account.email,
              phone: account.phone,
              transactionType: "verify",
              status: "pending",
              documentType: null
            }
            return {
              success: true,
              statusCode: "0",
              messageCode: "transaction verify created",
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
          statusCode: "-3",
          messageCode: "account not found",
          data: null
        } as unknown as AuthIdResponse;
      }
    } catch (error) {
      log(`Error creating verify transaction ${error}`)
      throw new BadRequestException('Error creating verify transaction');
    }
  }

  async authId_create_transaction(account: AuthIdAccountDto): Promise<AuthIdResponse> {
    try {
      const isEnrolled = await this.findEmail(account.email);
      if (isNotNullAndNotEmpty(isEnrolled) && isNotNullAndNotEmpty(isEnrolled.accountNumber))
        return this.authid_Verification(account);
      else return this.authid_Enrollment_Document(account);
    } catch (error) {
      log(`error creating transaction ${error}`);
      throw new BadRequestException('Error creating transaction');
    }
  }

  async create_account(accessToken: String, createAccount: AuthIdAccountDto): Promise<AuthIdResponse> {
    try {
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
      if (responseAccount) {
        return {
          success: true,
          statusCode: "200",
          messageCode: "user created successfully",
          data: responseAccount,
        } as unknown as AuthIdResponse;
      } else {
        return {
          success: false,
          statusCode: "-1",
          messageCode: "user created failed",
          data: null,
        } as unknown as AuthIdResponse;
      }
    } catch (error) {
      log("error creating account", error);
      throw new BadRequestException('Error creating account');
    }
  }

  async checkAuthidTransactionStatus(authIdCheckOperation: AuthIdCheckOperationDto): Promise<AuthIdResponse> {
    try {
      const accessToken = await this.authIdTokenService.getAccessToken();
      if (isNotNullAndNotEmpty(accessToken)) {
        const config = {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
        const url = `${AUTH_ID_OPERATION_ENROLL_URL}/${authIdCheckOperation.operationId}/status`;
        const response = await this.externalRequestService.getDataFromExternalApi(url, config).toPromise();
        if (isNotNullAndNotEmpty(response) && isNotNullAndNotEmpty(response["Status"])) {
           
          return {
            success: true,
            statusCode: "0",
            messageCode: "transaction status check successful",
            data: response,
          } as unknown as AuthIdResponse;
        } else {
          return {
            success: false,
            statusCode: "-1",
            messageCode: "transaction status check failed",
            data: null,
          } as unknown as AuthIdResponse;
        }
      } else {
        return {
          success: false,
          statusCode: "-1",
          messageCode: "token not found",
          data: null,
        } as unknown as AuthIdResponse;
      }
    } catch (error) {
      log("error checking transaction status", error);
      throw new BadRequestException('Error checking transaction status');
    }
  }

  async create(createAuthIdAccount: CreateAuthIdAccount): Promise < AuthIdAccount > {
  const result = await this.authIdAccountModel.findOne(createAuthIdAccount).exec();
  if(!result) {
    log(createAuthIdAccount);
    return this.authIdAccountModel.create(createAuthIdAccount);
  }else {
    throw new NotFoundException(`authid Account exists`);
  }
}

  async updateById(id: ObjectId, updateAuthIdAccount: CreateAuthIdAccount): Promise < AuthIdAccount > {
  try {
    const result = await this.findOne(id);
    if(!result) {
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
  } catch(error) {
    log(`Error updating user: ${error}`);
    throw new BadRequestException('Error updating account');
  }
}

  async findOne(id: ObjectId): Promise < AuthIdAccount > {
  try {
    const account = await this.authIdAccountModel.findById(id).exec()
      if(!account) throw new NotFoundException('User not found');
    return account;
  } catch(error) {
    log(`Error finding user: ${error}`);
    throw new NotFoundException('User not found');
  }
}
  async findEmail(email: String): Promise < AuthIdAccount > {
  try {
    const account = await this.authIdAccountModel.findOne({ email: email }).exec()
      if(!account) return null;
    return account;
  } catch(error) {
    log(`Error finding user: ${error}`);
    throw new NotFoundException('User not found');
  }
}



}