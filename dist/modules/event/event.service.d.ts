import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';
import { UploadService } from './../upload/services/upload.service';
import { CreateEventDTO } from './dtos/createEvent.dto';
import { EventResolverService } from './resolverservice/event.resolverservice';
import { UpdateEventDTO } from './dtos/updateEvent.dto';
export declare class EventService {
    private eventModel;
    private uploadService;
    private eventResolverService;
    constructor(eventModel: Model<Event>, uploadService: UploadService, eventResolverService: EventResolverService);
    findAllEvents(): Promise<Event[]>;
    findAllEventsByUserId(userId: string): Promise<Event[]>;
    createEvent(event: CreateEventDTO): Promise<Event>;
    createEventsByProcess(): Promise<Event[]>;
    findEventById(id: string): Promise<Event>;
    findEventBySlug(slug: string): Promise<Event>;
    updateEventById(id: string, event: UpdateEventDTO): Promise<Event>;
    deleteEventById(id: string): Promise<Event>;
}
