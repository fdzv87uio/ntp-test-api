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

    @Prop({type: [String],
        enum: ["Presencial", "Virtual"],
        default: "Presencial",
        required: false})    
    eventType: string;

    @Prop()
    date: string;

    @Prop()
    location: string;

    @Prop()
    address: string;

    @Prop()
    city: string;

    @Prop()
    author: string;

    @Prop()
    userId: string;

    @Prop()
    preferenceListIds: string[];

    @Prop()
    guestList: string[];

    @Prop()
    uploads: string[];
}

export const EventSchema = SchemaFactory.createForClass(Event);