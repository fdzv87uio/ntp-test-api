import { Controller, Post, Body, Param, Get, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PreferenceService } from '../services/preference.service';
import { CreatePreferenceDto } from '../dtos/create-preference.dto';
import { JwtAuthGuard } from 'src/modules/auth/guard';
import { HasRoles } from 'src/modules/auth/decorators/has-role.decorator';
import { Role } from 'src/modules/auth/models/role.enum';
import { RolesGuard } from 'src/modules/auth/guard/roles.guard';
import { UpdatePreferenceDto } from '../dtos/update-preference.dto';
import { Preference } from '../schemas/preference.schema';


@ApiTags('Preference')
@Controller('preference')
export class PreferenceController {
  constructor(private readonly preferenceService: PreferenceService) {}


  @ApiOperation({ summary: 'Get all preferences by categories' })
  @Get('findAllByCategories')
  async findAllByCategories() {
    return this.preferenceService.findAllWithCategories();
  }

  @ApiOperation({ summary: 'Get all preferences' })
  @Get('findAll')
  async findAll() {
    return this.preferenceService.findAll();
  }

  @ApiOperation({ summary: 'Get Preference by id' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.preferenceService.findById(id);
  }

  //@HasRoles(Role.Admin)
  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@ApiBearerAuth()
  @ApiOperation({ summary: 'Create Preference' })
  @Post()
  async create(@Body() preferenceDto: CreatePreferenceDto) {
    return this.preferenceService.create(preferenceDto);
  }

  /*@HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()*/
  @ApiOperation({ summary: 'Update preference' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() preference: UpdatePreferenceDto): Promise<Preference> {
    return this.preferenceService.updateById(id, preference);
  }

 /* @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()*/
  @ApiOperation({ summary: 'Update preference' })
  @Put(':id')
  async deleteById(@Param('id') id: string): Promise<Preference> {
    return this.preferenceService.deleteById(id);
  }

}
