export declare class Element {
    userId: string;
    title: string;
    slug?: string;
    description: string;
    status: string;
    category: string;
    operation: string;
    price?: number;
    latitude?: string;
    longitude?: string;
    schedule?: string;
    location?: string;
    address?: string;
    city?: string;
    country?: string;
    authorName?: string;
    authorNationality?: string;
    authorPhone?: string;
    authorEmail?: string;
    plan?: string;
    deadline?: string;
    images?: string[];
    videos?: string[];
    site: string;
}
export declare const ElementSchema: import("mongoose").Schema<Element, import("mongoose").Model<Element, any, any, any, import("mongoose").Document<unknown, any, Element> & Element & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Element, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Element>> & import("mongoose").FlatRecord<Element> & {
    _id: import("mongoose").Types.ObjectId;
}>;
