import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthIdToken } from '../interfaces/auth-id-token.interface';
import  { AuthIdTokenService } from '../services/auth-id-token.service';
import { AuthIdService } from '../services/auth-id.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthIdResponse } from '../interfaces/auth-id.interface';
import { AuthIdAccountDto } from '../dtos/auth-id_dto.dto';
import { AuthIdCompleteEnrollDto } from '../dtos/auth-id-complete-enroll.dto';
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
    @ApiOperation({ summary: 'AuthId Enroll Account'})
    @Post('enroll-account')
    async createAccount(@Body() authIdAccount: AuthIdAccountDto): Promise<AuthIdResponse>{
        return this.authIdService.authid_Enrollment(authIdAccount);
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

    @ApiOperation({summary: 'AuthId Complete Enrollment'})
    @Post('complete-enrollment')
    async completeEnrollment(@Body() completeEnroll:AuthIdCompleteEnrollDto): Promise<AuthIdResponse>{
        return this.authIdService.authid_complete_enrollment(completeEnroll);       
    }
     
}
