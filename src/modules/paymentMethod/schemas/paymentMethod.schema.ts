import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class PaymentMethod {

    @Prop()
    userEmail: string;

    @Prop()
    hash: string;

    @Prop()
    description: string;

    @Prop({ default: 'pending' })
    status?: string;

}

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);