import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Order {

    @Prop()
    userId: string;

    @Prop()
    name: string;

    @Prop()
    id: string;

    @Prop()
    address: string;

    @Prop()
    city: string;

    @Prop()
    country: string;

    @Prop()
    phone: string;

    @Prop()
    email: string;

    @Prop()
    item: string;

    @Prop()
    amount: number;

    @Prop()
    paymentMethodId: string;

    @Prop()
    status: string;

}

export const OrderSchema = SchemaFactory.createForClass(Order);