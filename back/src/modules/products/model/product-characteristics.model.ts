import { Prop, Schema } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('ProductCharacteristicsObject')
// @ObjectType('ProductCharacteristicsInput')
@Schema({ _id: false })
export class ProductCharacteristics {
  @Field(() => String, { nullable: true })
  @Prop()
  one: string;

  @Field(() => String, { nullable: true })
  @Prop()
  two: string;
}
