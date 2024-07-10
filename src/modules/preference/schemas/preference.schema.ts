import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Category } from 'src/modules/category/schemas/category.schema';


export type PreferenceDocument = Preference & Document;

@Schema()
export class Preference {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category', required: true })
  category: Category;
}

export const PreferenceSchema = SchemaFactory.createForClass(Preference);