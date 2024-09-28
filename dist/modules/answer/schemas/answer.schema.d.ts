export declare class Answer {
    userId: string;
    taskId: string;
    taskTitle: string;
    captureDatetime: Date;
    latitude: string;
    longitude: string;
    status?: string;
    location?: string;
    address?: string;
    city?: string;
    country?: string;
    description?: string;
    images?: string[];
    annotations?: any[];
    classes?: string[];
}
export declare const AnswerSchema: import("mongoose").Schema<Answer, import("mongoose").Model<Answer, any, any, any, import("mongoose").Document<unknown, any, Answer> & Answer & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Answer, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Answer>> & import("mongoose").FlatRecord<Answer> & {
    _id: import("mongoose").Types.ObjectId;
}>;
