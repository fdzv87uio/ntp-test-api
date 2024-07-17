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
    url?: string;

    @Prop({type: [String],
        enum: ["in-person", "online"],
        default: "in-person",
        required: false})    
    eventType: string;

    @Prop()
    startDate: Date;

    @Prop()
    endDate?: Date;
    
    @Prop()
    isFrecuency?:boolean;

    @Prop({type: [String],
     enum: ["None","Weekle", "Monthly"],
     default: "None",
     required: false})
    frecuency?: string;

    @Prop()
    location?: string;

    @Prop()
    address?: string;

    @Prop()
    city?: string;

    @Prop()
    author?: string;

    @Prop()
    userId: string;

    @Prop()
    preferenceListIds: string[];

    @Prop()
    guestList?: string[];

    @Prop()
    uploads?: string[];
}

export const EventSchema = SchemaFactory.createForClass(Event);