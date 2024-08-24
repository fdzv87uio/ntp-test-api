/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, UseGuards, Body, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../../user/services/user.service';
import { Email } from '../../common/decorators';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guard'
import { LoginDTO } from '../dtos/login.dto'
import { CreateUserDto } from '../../user/dtos/create-user.dto';
import { log } from 'console';
import { ForgotPasswordDTO } from '../dtos/forgotPassword.dto';
import { ResetPasswordDTO } from '../dtos/resetPassword.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() user: LoginDTO) {
        const dataAuth = await this.authService.login(user);
        return {
            message: 'Login success',
            dataAuth: dataAuth
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('test')
    test(@Req() req) {
        return 'Test Token service';
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('profile')
    profile(@Email() email: string) {
        return this.userService.myProfile(email);
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

    @ApiOperation({ summary: 'Create Password Reset email' })
    @Post('forgotPassword')
    async forgotPassword(@Body() forgotPasswordDTO: ForgotPasswordDTO) {
        await this.authService.resetPasswordEmail(forgotPasswordDTO.email);
        return {
            message: 'password reset email sent',
        }
    }

    @ApiOperation({ summary: 'Reset Password' })
    @Post('resetPassword')
    async resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO) {
        const res = await this.authService.resetPassword(resetPasswordDTO);
        return res;
    }
}
