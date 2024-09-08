import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard';
import { CreateAnswerDTO } from './dtos/createAnswer.dto';
import { AnswerService } from './answer.service';

@ApiTags('Answers')
@Controller('answers')
export class AnswerController {
    constructor(
        private answerService: AnswerService
    ) {}

    // Get All Existing Answers
    @ApiOperation({ summary: 'Get All Answers' })
    @Get()
    async getAllAnswers(): Promise<any[]> {
        return this.answerService.findAllAnswers();
    }

    // Get All Existing Answers by UserID
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get All Answers by User ID' })
    @Get('getAllByUserId/:id')
    async getAllAnswersByUserId(@Param('id') userId: string): Promise<any[]> {
        return this.answerService.findAllAnswersByUserId(userId);
    }

    //Create New Answer
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create New Answer' })
    @Post('new')
    async createAnswer(@Body() answer: CreateAnswerDTO): Promise<any> {
        return this.answerService.createAnswer(answer)
    }


    // Get Answer By ID
    @ApiOperation({ summary: 'Get Answer By ID' })
    @Get(':id')
    async getAnswer(
        @Param('id')
        id: string
    ): Promise<any> {
        return this.answerService.findAnswerById(id);
    }

    // Update Answer
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update Answer' })
    @Put(':id')
    async updateAnswer(@Param('id') id: string, @Body() answer: any): Promise<any> {
        return this.answerService.updateAnswerById(id, answer);
    }

    // Delete Answer
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete Answer' })
    @Delete(':id')
    async deleteAnswer(@Param('id') id: string): Promise<any> {
        return this.answerService.deleteAnswerById(id);
    }
}
