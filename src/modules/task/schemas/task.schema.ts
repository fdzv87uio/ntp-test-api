import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})
export class Task {

    @Prop()
    title: string;

    @Prop({
        type: String,
        required: false,
        default: "none"
    })
    slug?: string;

    @Prop()
    description: string;

    @Prop()
    instructions: string;

    @Prop({
        type: Number,
        default: 0
    })
    reward: number;

    @Prop()
    url?: string;

    @Prop({
        type: String,
        default: "active",
        required: true,
    })
    status?: string;


    @Prop()
    startDate: Date;


    @Prop()
    endDate?: Date;


    @Prop()
    location?: string;

    @Prop()
    address?: string;

    @Prop()
    city?: string;

    @Prop()
    country?: string;

    @Prop()
    author?: string;

    @Prop()
    authorId: string;

    @Prop()
    images?: string[];

    @Prop()
    videos?: string[];

    @Prop()
    participants?: string[];

    @Prop()
    blacklist?: string[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);