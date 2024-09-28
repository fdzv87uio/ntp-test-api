import { EventService } from './event.service';
import { EventType } from './interfaces/event.interface';
import { UpdateEventDTO } from './dtos/updateEvent.dto';
import { CreateEventDTO } from './dtos/createEvent.dto';
export declare class EventController {
    private eventService;
    constructor(eventService: EventService);
    getAllEvents(): Promise<EventType[]>;
    getAllEventsByUserId(userId: string): Promise<EventType[]>;
    createEvent(event: CreateEventDTO): Promise<EventType>;
    getEventBySlug(slug: string): Promise<EventType>;
    getEvent(id: string): Promise<EventType>;
    updateEvent(id: string, event: UpdateEventDTO): Promise<EventType>;
    deleteEvent(id: string): Promise<EventType>;
}
