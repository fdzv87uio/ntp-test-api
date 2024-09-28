import { Model } from "mongoose";
import { Event } from '../schemas/event.schema';
export declare class EventResolverService {
    private eventModel;
    constructor(eventModel: Model<Event>);
    getNextDate(frecuency: string, date: Date): Promise<Date>;
    createDateEvents(event: Event): Promise<Event[]>;
    convertWeekleDate(date: Date): Promise<Date>;
    convertMonthlyDate(date: Date): Promise<Date>;
    convertYearlyDate(date: Date): Promise<Date>;
    parsingEvent(event: Event): Promise<Event>;
}
