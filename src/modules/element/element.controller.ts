import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard';
import { ElementService } from './element.service';
import { CreateElementDTO } from './dtos/createElement.dto';
import { UpdateElementDTO } from './dtos/updateElement.dto';

@ApiTags('Elements')
@Controller('element')
export class ElementController {
    constructor(
        private elementService: ElementService
    ) {}

    // Get All Existing Elements
    @ApiOperation({ summary: 'Get All Elements' })
    @Get()
    async getAllElements(): Promise<any[]> {
        return this.elementService.findAllElements();
    }

    // Get All Existing Elements by UserID
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get All Available Elements by User Email' })
    @Get('getAllAvaliableByUserEmail/:email')
    async getAllElementsByUserId(@Param('email') userEmail: string): Promise<any[]> {
        return this.elementService.findAllAvailableElementsByUserEmail(userEmail);
    }

    //Create New Element
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create New Element' })
    @Post('new')
    async createElement(@Body() element: CreateElementDTO): Promise<any> {
        return this.elementService.createElement(element)
    }

    // Get Element By ID
    @ApiOperation({ summary: 'Get Element By ID' })
    @Get('getElementBySlug/:slug')
    async getElementBySlug(
        @Param('slug')
        slug: string
    ): Promise<any> {
        return this.elementService.findElementBySlug(slug);
    }

    // Get Element By ID
    @ApiOperation({ summary: 'Get Element By ID' })
    @Get(':id')
    async getElement(
        @Param('id')
        id: string
    ): Promise<any> {
        return this.elementService.findElementById(id);
    }

    // Update Element
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update Element' })
    @Put(':id')
    async updateElement(@Param('id') id: string, @Body() element: UpdateElementDTO): Promise<any> {
        return this.elementService.updateElementById(id, element);
    }

    // Delete Element
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete Element' })
    @Delete(':id')
    async deleteElement(@Param('id') id: string): Promise<any> {
        return this.elementService.deleteElementById(id);
    }
}