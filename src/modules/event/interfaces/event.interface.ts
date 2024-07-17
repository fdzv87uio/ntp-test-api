
export interface EventType {
    title: string;
    description: string;
    url?: string;
    eventType: string;
    startDate: Date;
    endDate?: Date;
    isFrecuency?:boolean;
    frecuency?:string;
    location?: string;
    city?: string; 
    address?: string;   
    author?: string;
    userId: string;
    preferenceListIds: string[];
    guestList?: string[];
    uploads?: string[];    
}