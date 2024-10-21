import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})
export class Element {

    @Prop()
    userId: string;

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

    @Prop({
        type: String,
        default: "active",
    })
    status: string;

    @Prop()
    location?: string;

    @Prop()
    address?: string;

    @Prop()
    city?: string;

    @Prop()
    country?: string;

    @Prop()
    authorName?: string;

    @Prop()
    authorNationality?: string;

    @Prop()
    authorPhone?: string;

    @Prop()
    authorEmail?: string;

    @Prop()
    images?: string[];

    @Prop()
    videos?: string[];
    

}

export const ElementSchema = SchemaFactory.createForClass(Element);