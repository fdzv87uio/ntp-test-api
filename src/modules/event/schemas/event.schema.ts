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
    url: string;

    @Prop()
    eventType: string;

    @Prop()
    date: string;

    @Prop()
    location: string;

    @Prop()
    city: string;

    @Prop()
    country: string;

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

    @Prop()
    eventImage: Buffer;


}

export const EventSchema = SchemaFactory.createForClass(Event);