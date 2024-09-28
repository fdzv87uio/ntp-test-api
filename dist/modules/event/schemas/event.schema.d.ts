export declare class Event {
    title: string;
    slug?: string;
    description: string;
    url?: string;
    eventType: string;
    eventMode: string;
    repeatOn?: string[];
    startDate: Date;
    startTime: string;
    eventEnds?: boolean;
    endDate?: Date;
    endTime: string;
    occurenceCount?: number;
    isFrecuency?: boolean;
    frecuency?: string;
    frecuencyStatus?: string;
    location?: string;
    address?: string;
    city?: string;
    author?: string;
    userId: string;
    preferenceListIds?: string[];
    guestList?: string[];
    images?: string[];
    videos?: string[];
}
export declare const EventSchema: import("mongoose").Schema<Event, import("mongoose").Model<Event, any, any, any, import("mongoose").Document<unknown, any, Event> & Event & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Event, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Event>> & import("mongoose").FlatRecord<Event> & {
    _id: import("mongoose").Types.ObjectId;
}>;
