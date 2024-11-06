export declare class Order {
    userId: string;
    name: string;
    id: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    item: string;
    amount: number;
    paymentMethodId: string;
    status: string;
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, import("mongoose").Document<unknown, any, Order> & Order & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Order>> & import("mongoose").FlatRecord<Order> & {
    _id: import("mongoose").Types.ObjectId;
}>;
