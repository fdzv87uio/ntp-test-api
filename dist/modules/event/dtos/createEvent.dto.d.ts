export declare class CreateEventDTO {
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
    endTime?: string;
    occurrenceCount?: number;
    repeatEveryCount?: number;
    isFrecuency?: boolean;
    frecuency?: string;
    frecuencyStatus?: string;
    location?: string;
    address: string;
    city: string;
    author?: string;
    userId: string;
    preferenceListIds: string[];
    guestList?: string[];
    images?: string[];
    videos?: string[];
}
