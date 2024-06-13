import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})
export class Event {

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    eventType: string;

    @Prop()
    date: string;

    @Prop()
    location: string;

    @Prop()
    author: string;

    @Prop()
    userId: string;

    @Prop()
    categoryList: string[];

    @Prop()
    guestList: string[];

    @Prop()
    uploads: string[];
}

export const EventSchema = SchemaFactory.createForClass(Event);