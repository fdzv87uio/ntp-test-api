import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';
import { UploadService } from './../upload/services/upload.service'
import { CreateEventDTO } from './dtos/createEvent.dto';
import { log } from 'console';

@Injectable()
export class EventService {
    constructor(
        @InjectModel(Event.name) private eventModel: Model<Event>,
        private uploadService: UploadService

    ) {}

    async findAllEvents(): Promise<Event[]> {
        const events = await this.eventModel.find();
        return events;
    }

    async findAllEventsByUserId(userId: string): Promise<Event[]> {
        const events = await this.eventModel.find({ userId: userId });
        return events;
    }

    async createEvent(event: Event): Promise<Event> {
        try {
            const res = await this.eventModel.create(event);
            return res;
        } catch (err) {
            log("error creating event " + err);
            throw new NotFoundException('Error creating event');
        }
    }

    async findEventById(id: string): Promise<Event> {
        const res = await this.eventModel.findById(id);
        if (!res) {
            throw new NotFoundException('Event Not Found');
        }
        return res;
    }

    async updateEventById(id: string, event: Event): Promise<Event> {
        const res = await this.eventModel.findByIdAndUpdate(id, event, {
            new: true,
            runValidators: true
        });
        return res;
    }

    async deleteEventById(id: string): Promise<Event> {
        const res = await this.eventModel.findByIdAndDelete(id);
        return res;
    }
}
