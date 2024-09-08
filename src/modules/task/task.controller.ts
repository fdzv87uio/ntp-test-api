import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dtos/createTask.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
    constructor(
        private taskService: TaskService
    ) {}

    // Get All Existing Tasks
    @ApiOperation({ summary: 'Get All Tasks' })
    @Get()
    async getAllTasks(): Promise<any[]> {
        return this.taskService.findAllTasks();
    }

    // Get All Existing Tasks by UserID
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get All Tasks by User ID' })
    @Get('getAllByUserId/:id')
    async getAllTasksByUserId(@Param('id') userId: string): Promise<any[]> {
        return this.taskService.findAllTasksByUserId(userId);
    }

    //Create New Task
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create New Task' })
    @Post('new')
    async createTask(@Body() task: CreateTaskDTO): Promise<any> {
        return this.taskService.createTask(task)
    }

    // Get Task By ID
    @ApiOperation({ summary: 'Get Task By ID' })
    @Get('getTaskBySlug/:slug')
    async getTaskBySlug(
        @Param('slug')
        slug: string
    ): Promise<any> {
        return this.taskService.findTaskBySlug(slug);
    }

    // Get Task By ID
    @ApiOperation({ summary: 'Get Task By ID' })
    @Get(':id')
    async getTask(
        @Param('id')
        id: string
    ): Promise<any> {
        return this.taskService.findTaskById(id);
    }

    // Update Task
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update Task' })
    @Put(':id')
    async updateTask(@Param('id') id: string, @Body() task: any): Promise<any> {
        return this.taskService.updateTaskById(id, task);
    }

    // Delete Task
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete Task' })
    @Delete(':id')
    async deleteTask(@Param('id') id: string): Promise<any> {
        return this.taskService.deleteTaskById(id);
    }
}
