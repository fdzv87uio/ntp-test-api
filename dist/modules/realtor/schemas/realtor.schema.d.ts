export declare class Realtor {
    userId: string;
    name: string;
    description: string;
    email: string;
    website: string;
    phone: string;
    logo: string;
    banner: string;
}
export declare const RealtorSchema: import("mongoose").Schema<Realtor, import("mongoose").Model<Realtor, any, any, any, import("mongoose").Document<unknown, any, Realtor> & Realtor & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Realtor, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Realtor>> & import("mongoose").FlatRecord<Realtor> & {
    _id: import("mongoose").Types.ObjectId;
}>;
