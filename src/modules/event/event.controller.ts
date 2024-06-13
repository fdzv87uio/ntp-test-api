import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { EventType } from './interfaces/event.interface';

@Controller('events')
export class EventController {
    constructor(
        private eventService: EventService
    ) {}

    // Get All Existing Events
    @Get()
    async getAllEvents(): Promise<EventType[]> {
        return this.eventService.findAllEvents();
    }

    // Create New Event
    @Post('new')
    async createEvent(@Body() event: EventType): Promise<EventType> {

        return this.eventService.createEvent(event)
    }

    // Get Event By ID
    @Get(':id')
    async getEvent(
        @Param('id')
        id: string
    ): Promise<EventType> {
        return this.eventService.findEventById(id);
    }

    // Update Event
    @Put(':id')
    async updateEvent(@Param('id') id: string, @Body() event: EventType): Promise<EventType> {
        return this.eventService.updateEventById(id, event);
    }

    // Delete Event
    @Delete(':id')
    async deleteEvent(@Param('id') id: string): Promise<EventType> {
        return this.eventService.deleteEventById(id);
    }
}
