import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})
export class Realtor {

    @Prop()
    userId: string;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    email: string;

    @Prop()
    website: string;

    @Prop()
    phone: string;

    @Prop()
    logo: string;

    @Prop()
    banner: string;

}

export const RealtorSchema = SchemaFactory.createForClass(Realtor);