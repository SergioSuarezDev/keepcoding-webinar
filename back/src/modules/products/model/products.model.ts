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
import { Category } from 'src/modules/categories/model/categories.model';
import { ProductCharacteristics } from './product-characteristics.model';

registerEnumType(StatusEnum, {
  name: 'StatusEnum',
  description: 'Product status'
});

@ObjectType()
@Schema({
  timestamps: true
})
export class Product {
  @Field(() => ObjectIdScalar)
  _id: MongooseTypes.ObjectId;

  @Field(() => StatusEnum)
  @Prop({ index: true })
  status: StatusEnum;

  @Field(() => String)
  @Prop({ index: true })
  name: string;

  @Directive('@upperCaseDirective')
  @Field(() => String)
  @Prop()
  description: string;

  @Field(() => [Category], { nullable: true })
  @Prop({ type: MongooseTypes.ObjectId, ref: 'Category' })
  categories: Category[];

  @Field(() => ProductCharacteristics, { nullable: true })
  @Prop({ default: {} })
  characteristics: ProductCharacteristics;

  @Field(() => Float)
  @Prop()
  price: number;

  @Field(() => Float)
  @Prop()
  percentDiscount: number;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
