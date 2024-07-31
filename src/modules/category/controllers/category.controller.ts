import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Category } from '../schemas/category.schema';
import { HasRoles } from 'src/modules/auth/decorators/has-role.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guard';
import { RolesGuard } from 'src/modules/auth/guard/roles.guard';
import { Role } from 'src/modules/auth/models/role.enum';
import { CategoryDto } from '../dtos/category.dto';
import { ICategory } from '../interfaces/category.interface';

@ApiTags('Category')
@Controller('Category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}    
    
    @ApiOperation({ summary: 'List of the categories' })
    @Get('/')
    async findAll(): Promise<ICategory[]> {
        return this.categoryService.findAll();
    }   

    @ApiOperation({ summary: 'Find category by name' })
    @Get('find/:name')
    async findByName(@Param('name')name:string): Promise<ICategory> {
        return this.categoryService.findByName(name);
    }

    @ApiOperation({ summary: 'Find category by id' })
    @Get('find/:id')
    async findById(@Param('id')id:string): Promise<ICategory> {
        return this.categoryService.findById(id);
    }

   /* @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()    */
    @ApiOperation({summary: 'Create a new category'})
    @Post('new')
    async create(@Body() categoryDto: CategoryDto): Promise<ICategory>{
        return this.categoryService.create(categoryDto);
    }

   
    /*@HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @ApiBearerAuth()*/
    @ApiOperation({ summary: 'Update category' })
    @Put(':id')
    async update(@Param('id') id: string, @Body() event: CategoryDto): Promise<ICategory> {
        return this.categoryService.updateById(id, event);
    }


}
