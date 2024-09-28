export declare class Task {
    title: string;
    slug?: string;
    description: string;
    instructions: string;
    reward: number;
    url?: string;
    status?: string;
    startDate: Date;
    endDate?: Date;
    location?: string;
    address?: string;
    city?: string;
    country?: string;
    author?: string;
    authorId: string;
    images?: string[];
    videos?: string[];
    participants?: string[];
    blacklist?: string[];
    classes?: string[];
}
export declare const TaskSchema: import("mongoose").Schema<Task, import("mongoose").Model<Task, any, any, any, import("mongoose").Document<unknown, any, Task> & Task & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Task, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Task>> & import("mongoose").FlatRecord<Task> & {
    _id: import("mongoose").Types.ObjectId;
}>;
