import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthIdToken } from '../interfaces/auth-id-token.interface';
import  { AuthIdTokenService } from '../services/auth-id-token.service';
import { AuthIdService } from '../services/auth-id.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthIdResponse } from '../interfaces/auth-id.interface';
import { CreateAuthIdAccount } from '../dtos/create-auth-id-account.dto';
import { CreateAuthIdAccountDto } from '../dtos/create-Auth-id.dto';
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
    @ApiOperation({ summary: 'Create AuthId Account'})
    @Post('create-account')
    async createAccount(@Body() createAuthIdAccount: CreateAuthIdAccountDto): Promise<AuthIdResponse>{
        return this.authIdService.authid_login_send_sms(createAuthIdAccount);
    }
     
}
