export declare class PaymentMethod {
    userEmail: string;
    hash: string;
    description: string;
    status?: string;
}
export declare const PaymentMethodSchema: import("mongoose").Schema<PaymentMethod, import("mongoose").Model<PaymentMethod, any, any, any, import("mongoose").Document<unknown, any, PaymentMethod> & PaymentMethod & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PaymentMethod, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PaymentMethod>> & import("mongoose").FlatRecord<PaymentMethod> & {
    _id: import("mongoose").Types.ObjectId;
}>;
