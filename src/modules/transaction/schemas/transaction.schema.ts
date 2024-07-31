import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Transaction {

    @Prop()
    userEmail: string;

    @Prop()
    transactionType: string;

    @Prop({ default: "n/a" })
    os?: string;

    @Prop({ default: "n/a" })
    browser?: string;

    @Prop({ default: "n/a" })
    version?: string;

    @Prop({ default: "n/a" })
    device?: string;

    @Prop()
    location: string;

    @Prop()
    ip: string;

    @Prop()
    datetime: string;

}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);