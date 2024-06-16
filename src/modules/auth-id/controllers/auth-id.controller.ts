import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthIdToken } from '../interfaces/auth-id-token.interface';
import  { AuthIdTokenService } from '../services/auth-id-token.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('AuthId')
@Controller('auth-id')
export class AuthIdController {
    constructor(private readonly authIdTokenService: AuthIdTokenService) { }
    @ApiOperation({ summary: 'Get AuthId Token'})    
    @Get('get')
    async findAll(): Promise<String> {
        return this.authIdTokenService.getAccessToken();
    }
     
}
