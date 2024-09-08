import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})
export class Answer {

    @Prop()
    userId: string;

    @Prop()
    taskId: string;

    @Prop()
    submissionDatetime: Date;

    @Prop()
    latitude: string;

    @Prop()
    longitude: string;


    @Prop({
        type: String,
        default: "pending",
        required: true,
    })
    status?: string;

    @Prop()
    location?: string;

    @Prop()
    address?: string;

    @Prop()
    city?: string;

    @Prop()
    country?: string;

    @Prop()
    description?: string;

    @Prop()
    images?: string[];

    @Prop()
    annotations?: any[];
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);