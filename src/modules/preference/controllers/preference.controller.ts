import { Controller, Post, Body, Param, Get, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PreferenceService } from '../services/preference.service';
import { CreatePreferenceDto } from '../dtos/create-preference.dto';
import { JwtAuthGuard } from 'src/modules/auth/guard';


@ApiTags('Preference')
@Controller('preference')
export class PreferenceController {
  constructor(private readonly preferenceService: PreferenceService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Preference' })  
  @Post()
  async create(@Body() createExampleDto: CreatePreferenceDto) {
    return this.preferenceService.create(createExampleDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add Preference' })
  @Put(':id/add-preference')
  async addPreference(@Param('id') id: string, @Body('value') value: string) {
    return this.preferenceService.addPreference(id, value);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Preference by id' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.preferenceService.findOne(id);
  }

  @ApiOperation({summary: 'Get all preferences'})
  @Get()
  async findAll(){
    return this.preferenceService.findAll();
  }
}
