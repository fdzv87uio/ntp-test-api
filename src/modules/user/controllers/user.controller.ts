import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../interfaces/user.interface';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'List of the user registers' })
    @Get('list')
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @ApiOperation({ summary: 'Find user by email' })
    @Get('find/:email')
    findById(@Param('email') email: string): Promise<User> {
        return this.userService.findOne(email);
    }


    @ApiOperation({ summary: 'Registry new user'})
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }
}