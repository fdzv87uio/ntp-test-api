import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { EventType } from './interfaces/event.interface';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard';
import { UpdateEventDTO } from './dtos/updateEvent.dto';
import { CreateEventDTO } from './dtos/createEvent.dto';

@ApiTags('Events')
@Controller('events')
export class EventController {
    constructor(
        private eventService: EventService
    ) {}

    // Get All Existing Events
    @ApiOperation({ summary: 'Get All Events' })
    @Get()
    async getAllEvents(): Promise<EventType[]> {
        return this.eventService.findAllEvents();
    }

    // Get All Existing Events by UserID
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get All Events by User ID' })
    @Get('getAllByUserId/:id')
    async getAllEventsByUserId(@Param('id') userId: string): Promise<EventType[]> {
        return this.eventService.findAllEventsByUserId(userId);
    }

    //Create New Event
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create New Event' })
    @Post('new')
    async createEvent(@Body() event: CreateEventDTO): Promise<EventType> {
        return this.eventService.createEvent(event)
    }

    // Get Event By ID
    @ApiOperation({ summary: 'Get Event By ID' })
    @Get('getEventBySlug/:slug')
    async getEventBySlug(
        @Param('slug')
        slug: string
    ): Promise<EventType> {
        return this.eventService.findEventBySlug(slug);
    }

    // Get Event By ID
    @ApiOperation({ summary: 'Get Event By ID' })
    @Get(':id')
    async getEvent(
        @Param('id')
        id: string
    ): Promise<EventType> {
        return this.eventService.findEventById(id);
    }

    // Update Event
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update Event' })
    @Put(':id')
    async updateEvent(@Param('id') id: string, @Body() event: UpdateEventDTO): Promise<EventType> {
        return this.eventService.updateEventById(id, event);
    }

    // Delete Event
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete Event' })
    @Delete(':id')
    async deleteEvent(@Param('id') id: string): Promise<EventType> {
        return this.eventService.deleteEventById(id);
    }
}
