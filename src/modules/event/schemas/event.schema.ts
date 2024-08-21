import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({
    timestamps: true
})
export class Event {

    @Prop()
    title: string;

    @Prop({
        type: String,
        default: "none"
    })
    slug?: string;

    @Prop()
    description: string;

    @Prop()
    url?: string;

    @Prop({
        type: String,
        enum: ["public", "private"],
        default: "private"
    })
    eventType: string;

    // new Prop
    @Prop({
        type: String,
        enum: ["in-person", "online"],
        default: "in-person"
    })
    eventMode: string;

    @Prop({
        type: [String],
        required: false
    })
    repeatOn?: string[];

    @Prop()
    startDate: Date;

    @Prop()
    startTime: string;

    @Prop({
        type: Boolean,
        default: true,
        required: false
    })
    eventEnds?: boolean;

    @Prop()
    endDate?: Date;

    @Prop()
    endTime: string;

    @Prop({
        type: Number,
        default: 1,
        required: false
    })
    occurenceCount?: number;

    @Prop()
    isFrecuency?: boolean;

    @Prop({
        type: [String],
        enum: ["None", "Day", "Week", "Month", "Year"],
        default: "None",
        required: false
    })
    frecuency?: string;

    @Prop({
        type: [String],
        enum: ["None", "Pending", "Executed"],
        default: "None",
        required: false
    })
    frecuencyStatus?: string;

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

    @Prop({
        type: [String],
        required: false
    })
    preferenceListIds?: string[];

    @Prop()
    guestList?: string[];

    @Prop()
    images?: string[];

    @Prop()
    videos?: string[];
}

export const EventSchema = SchemaFactory.createForClass(Event);