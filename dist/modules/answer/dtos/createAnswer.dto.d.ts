export declare class CreateAnswerDTO {
    userId: string;
    taskId: string;
    taskTitle: string;
    captureDatetime: Date;
    latitude: string;
    longitude: string;
    status: string;
    location?: string;
    address: string;
    city: string;
    country: string;
    description: string;
    images?: string[];
    annotations?: string[];
    classes?: string[];
}
