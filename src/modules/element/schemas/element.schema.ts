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

    @Prop({
        type: String,
        default: "mujeres",
    })
    category: string;

    @Prop({
        type: String,
        default: "renta",
    })
    operation: string;

    @Prop({
        type: Number,
        default: 0,
    })
    price?: number;

    @Prop({
        type: String,
        default: "-0.15899762074480503",
    })
    latitude?: string;

    @Prop({
        type: String,
        default: "-78.46525402178685",
    })
    longitude?: string;

    @Prop({
        type: [String],
        default: ["J"],
    })
    schedule?: string;

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

    @Prop({ default: "none" })
    plan?: string;

    @Prop({ default: "none" })
    deadline?: string;

    @Prop()
    images?: string[];

    @Prop()
    videos?: string[];

    @Prop({ default: "picosa" })
    site: string;


}

export const ElementSchema = SchemaFactory.createForClass(Element);