import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard';
import { RealtorService } from './realtor.service';
import { CreateRealtorDTO } from './dtos/createRealtor.dto';
import { UpdateRealtorDTO } from './dtos/updateRealtor.dto';


@ApiTags('Realtors')
@Controller('realtor')
export class RealtorController {
    constructor(
        private realtorService: RealtorService
    ) {}

    // Get All Existing Realtors
    @ApiOperation({ summary: 'Get All Realtors' })
    @Get()
    async getAllRealtors(): Promise<any[]> {
        return this.realtorService.findAllRealtors();
    }

    // Get Realtor by User Id
    @ApiOperation({ summary: 'Get Realtor by User Id' })
    @Get('getByUserId/:id')
    async getRealtorByUserId(@Param('id') id: string): Promise<any> {
        return this.realtorService.findRealtorByUserId(id);
    }

    // Get Realtor by Id
    @ApiOperation({ summary: 'Get Realtor by Id' })
    @Get('getById/:id')
    async getRealtorByd(@Param('id') id: string): Promise<any> {
        return this.realtorService.findRealtorById(id);
    }



    //Create New Realtor
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create New Realtor' })
    @Post('new')
    async createRealtor(@Body() realtor: CreateRealtorDTO): Promise<any> {
        return this.realtorService.createRealtor(realtor)
    }


    // Update Realtor
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update Realtor' })
    @Put(':id')
    async updateRealtor(@Param('id') id: string, @Body() realtor: UpdateRealtorDTO): Promise<any> {
        return this.realtorService.updateRealtorById(id, realtor);
    }

    // Delete Realtor
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete Realtor' })
    @Delete(':id')
    async deleteRealtor(@Param('id') id: string): Promise<any> {
        return this.realtorService.deleteRealtorById(id);
    }
}

