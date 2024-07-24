
export interface EventType {
    title: string;
    slug?: string;
    description: string;
    url?: string;
    eventType: string;
    eventMode: string;
    startDate: Date;
    startTime: string; // timestamp as a string
    eventEnds?: boolean; // boolean to detect if event is set to conclude
    endDate?: Date;
    endTime?: string; // timestamp as a string (missing in figma)
    occurenceCount?: number; // number of event occurrences
    isFrecuency?: boolean;
    frecuency?: string; // new Enum values added
    frecuencyStatus?: string; // status enum
    location?: string;
    address?: string; // missing in figma
    city?: string; // missing in figma
    author?: string;
    userId: string;
    preferenceListIds?: string[];
    guestList?: string[]; // missing in Figma
    images?: string[]; // string array for images
    videos?: string[]; // string array for videos
}