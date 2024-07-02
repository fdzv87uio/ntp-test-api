import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthIdToken } from '../interfaces/auth-id-token.interface';
import  { AuthIdTokenService } from '../services/auth-id-token.service';
import { AuthIdService } from '../services/auth-id.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthIdResponse } from '../interfaces/auth-id.interface';
import { AuthIdAccountDto } from '../dtos/auth-id_dto.dto';
import { AuthIdCompleteEnrollDto } from '../dtos/auth-id-complete-enroll.dto';
import { AuthIdAccount } from '../interfaces/auth-id-account.interface';
@ApiTags('AuthId')
@Controller('auth-id')
export class AuthIdController {
    constructor(private readonly authIdTokenService: AuthIdTokenService,
        private readonly authIdService: AuthIdService
    ) { }
    @ApiOperation({ summary: 'Get AuthId Token'})    
    @Get('get')
    async findAll(): Promise<String> {
        return this.authIdTokenService.getAccessToken();
    }
    @ApiOperation({ summary: 'AuthId Enroll Document Account'})
    @Post('enroll-document-account')
    async createAccount(@Body() authIdAccount: AuthIdAccountDto): Promise<AuthIdResponse>{
        return this.authIdService.authid_Enrollment_Document(authIdAccount);
    }

    @ApiOperation({ summary: 'AuthId Enroll Face Account'})
    @Post('enroll-face-account')
    async createAccountFace(@Body() authIdAccount: AuthIdAccountDto): Promise<AuthIdResponse>{
        return this.authIdService.authid_Enrollment_Face(authIdAccount);
    }

    @ApiOperation({summary: 'AuthId Verify Account'})
    @Post('verify-account')
    async verifyAccount(@Body() authIdAccount: AuthIdAccountDto): Promise<AuthIdResponse>{
        return this.authIdService.authid_Verification(authIdAccount);       
    }

    @ApiOperation({summary: 'AuthId Create Transaction Biometric'})
    @Post('create-transaction')
    async createTransaction(@Body() authIdAccount: AuthIdAccountDto): Promise<AuthIdResponse>{
        return this.authIdService.authId_create_transaction(authIdAccount);       
    }

    @ApiOperation({summary: 'AuthId Complete Enrollment '})
    @Post('complete-enrollment')
    async completeEnrollment(@Body() completeEnroll:AuthIdCompleteEnrollDto): Promise<AuthIdResponse>{
        return this.authIdService.authid_complete_enrollment(completeEnroll);       
    }

    @ApiOperation({summary: 'AuthId Check Enrollments '})
    @Get('get-accounts')
    async getAuthIdAccounts() {
      return this.authIdService.checkAuthidTransactionStatus();
    }

    @ApiOperation({summary: 'AuthId Result Enrollments '})
    @Post('get-accounts')
    async getAuthIdResults(@Body()resultEnroll: AuthIdAccount) {
      return this.authIdService.resultAuthIdTransactionStatus(resultEnroll);
    }

    
     
}
