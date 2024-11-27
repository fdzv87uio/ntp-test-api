/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, UseGuards, Body, Req, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../../user/services/user.service';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dtos/login.dto'
import { CreateUserDto } from '../../user/dtos/create-user.dto';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post('login')
    async login(@Body() user: LoginDTO) {
        const dataAuth = await this.authService.login(user);
        return {
            message: 'Login success',
            dataAuth: dataAuth
        }
    }

    @ApiOperation({ summary: 'Registry new user' })
    @Post('register')
    async create(@Body() createUserDto: CreateUserDto) {
        const dataAuthRegister = await this.authService.register(createUserDto);
        return {
            message: 'register success',
            dataAuthRegister
        }
    }


    @ApiOperation({ summary: 'Validate token' })
    @Get('validateToken/:token')
    findById(@Param('token') token: string): Promise<any> {
        return this.authService.validateToken(token);
    }
}
