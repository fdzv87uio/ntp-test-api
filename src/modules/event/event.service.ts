import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';

@Injectable()
export class EventService {
    constructor(
        @InjectModel(Event.name) private eventModel: Model<Event>
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
        const res = await this.eventModel.create(event);
        return res;
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
