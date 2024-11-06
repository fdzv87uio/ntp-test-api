import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user.interface';
import { HasRoles } from 'src/modules/auth/decorators/has-role.decorator';
import { Role } from 'src/modules/auth/models/role.enum';
import { RolesGuard } from 'src/modules/auth/guard/roles.guard';


//
@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'List of the user registers' })
    @Get('list')
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @HasRoles(Role.Admin, Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Find user by email' })
    @Get('find/:email')
    findById(@Param('email') email: string): Promise<User> {
        return this.userService.findOne(email);
    }


    @ApiBearerAuth()
    @ApiOperation({ summary: 'Reset user status by Email' })
    @Put('resetUserStatusByEmail/:email')
    updateByEmail(@Param('email') email: string): Promise<User> {
        return this.userService.resetUserStatus(email);
    }
}