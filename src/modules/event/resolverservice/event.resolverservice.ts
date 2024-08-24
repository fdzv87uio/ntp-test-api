import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Event } from '../schemas/event.schema';
import { isNotNullAndNotEmpty } from "src/modules/common/utils/utils";

export class EventResolverService {
    constructor(
        @InjectModel(Event.name) private eventModel: Model<Event>,

    ) {}

    async getNextDate(frecuency: string, date: Date): Promise<Date> {

        switch (frecuency) {
            case "Weekly":
                return await this.convertWeekleDate(date);
            case "Daily":
                break;
            case "Monthly":
                return await this.convertMonthlyDate(date);
            case "Yearly":
                return await this.convertYearlyDate(date);
            case "None":
            default:
                break;
        }
    }

    async createDateEvents(event: Event): Promise<Event[]> {
        const events: Event[] = [];
        if (isNotNullAndNotEmpty(event.occurenceCount)) {
            for (let index = 0; index < event.occurenceCount; index++) {
                let eventToCreate: Event = null;
                if (events.length > 0) {
                    eventToCreate = await this.parsingEvent(events[events.length - 1])
                } else {
                    eventToCreate = await this.parsingEvent(event);
                }
                events.push(eventToCreate);
            }
        }
        return events;
    }

    async convertWeekleDate(date: Date): Promise<Date> {
        const newDate = new Date(date);
        // Add 7 days to the new date
        newDate.setDate(newDate.getDate() + 7);
        return newDate;
    }

    async convertMonthlyDate(date: Date): Promise<Date> {
        const newDate = new Date(date);
        // Add 1 month to the new date
        newDate.setMonth(newDate.getMonth() + 1);
        return newDate;
    }

    async convertYearlyDate(date: Date): Promise<Date> {
        const newDate = new Date(date);
        // Add 1 year to the new date
        newDate.setFullYear(newDate.getFullYear() + 1);
        return newDate;
    }

    async parsingEvent(event: Event): Promise<Event> {
        const eventToCreate: Event = new Event();
        eventToCreate.address = event.address;
        eventToCreate.author = event.author;
        eventToCreate.city = event.city;
        eventToCreate.description = event.description;
        eventToCreate.endDate = await this.getNextDate(event.frecuency, event.endDate);
        eventToCreate.endTime = event.endTime;
        eventToCreate.eventEnds = true;
        eventToCreate.eventMode = event.eventMode;
        eventToCreate.eventType = event.eventType;
        eventToCreate.frecuency = 'None';
        eventToCreate.frecuencyStatus = 'Executed';
        eventToCreate.guestList = event.guestList;
        eventToCreate.images = event.images;
        eventToCreate.isFrecuency = false;
        eventToCreate.location = event.location;
        eventToCreate.occurenceCount = 0;
        eventToCreate.preferenceListIds = event.preferenceListIds;
        eventToCreate.slug = event.slug;
        eventToCreate.startDate = await this.getNextDate(event.frecuency, event.startDate);
        eventToCreate.startTime = event.startTime;
        eventToCreate.title = event.title;
        eventToCreate.url = event.url;
        eventToCreate.userId = event.userId;
        eventToCreate.videos = event.videos;
        return eventToCreate;
    }
}
