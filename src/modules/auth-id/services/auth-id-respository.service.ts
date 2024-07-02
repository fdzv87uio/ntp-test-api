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
import moment from 'moment';
@Injectable()
export class AuthIdRepositoryService {

  constructor(
    @InjectModel('AuthIdAccount') private readonly authIdAccountModel: Model<AuthIdAccount>  ) {}

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

async findAllByRange(startDate: string, endDate: string): Promise < AuthIdAccount[] > {
    try {
      const accounts = await this.authIdAccountModel.find({
        created_at: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
        user_status:{$ne:"pending"}
      }).exec();
      if(!accounts) return null;
      return accounts;
    } catch(error) {
      log(`Error finding users: ${error}`);
      throw new NotFoundException('Users not found');
    }
  }
}