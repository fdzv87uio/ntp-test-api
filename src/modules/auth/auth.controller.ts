import { Controller, Get, Post, UseGuards, Body, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/services/user.service';
import { User } from '../common/decorators';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard'
import { LoginDTO } from './dtos/login.dto'
import { CreateUserDto } from '../user/dtos/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ){}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Body() user: LoginDTO){
        const dataAuth = this.authService.login(user);
        return {
            message: 'Login success',
            dataAuth
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('test')
    test(@Req() req){
        return 'Test Token service';
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('profile')
    profile(@User() user: CreateUserDto) {
        return this.userService.myProfile(user);
    }
}
