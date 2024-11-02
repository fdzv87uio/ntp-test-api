export declare class CreateTaskDTO {
    title: string;
    description: string;
    instructions: string;
    reward?: number;
    status: string;
    startDate: Date;
    endDate?: Date;
    location?: string;
    address: string;
    city: string;
    country: string;
    author?: string;
    authorId: string;
    images?: string[];
    videos?: string[];
    participants?: string[];
    project: string;
    blacklist?: string[];
    classes?: string[];
}
