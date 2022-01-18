import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Directive,
  Field,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';
import { Document, Types as MongooseTypes } from 'mongoose';

import { ObjectIdScalar } from 'src/common/scalars/object-id.scalar';
import { StatusEnum } from 'src/common/enums/status.enum';

registerEnumType(StatusEnum, {
  name: 'StatusEnum',
  description: 'Category status'
});

@ObjectType()
@Schema({
  timestamps: true
})
export class Category {
  @Field(() => ObjectIdScalar)
  _id: MongooseTypes.ObjectId;

  @Field(() => String)
  @Prop({ index: true })
  name: string;

  @Directive('@upperCaseDirective')
  @Field(() => String)
  @Prop()
  description: string;

  @Field(() => StatusEnum)
  @Prop({ index: true })
  status: StatusEnum;
}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
