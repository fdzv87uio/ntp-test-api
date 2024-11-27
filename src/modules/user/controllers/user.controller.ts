import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user.interface';


//
@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'List of the user registers' })
    @Get('list')
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }


}