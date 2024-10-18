export declare class Element {
    title: string;
    slug?: string;
    description: string;
    status: string;
    location?: string;
    address?: string;
    city?: string;
    country?: string;
    authorName?: string;
    authorNationality?: string;
    authorPhone?: string;
    authorEmail?: string;
    images?: string[];
    videos?: string[];
}
export declare const ElementSchema: import("mongoose").Schema<Element, import("mongoose").Model<Element, any, any, any, import("mongoose").Document<unknown, any, Element> & Element & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Element, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Element>> & import("mongoose").FlatRecord<Element> & {
    _id: import("mongoose").Types.ObjectId;
}>;
