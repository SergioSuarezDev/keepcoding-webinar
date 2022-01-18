import { Field, ObjectType } from '@nestjs/graphql';
import { Types as MongooseTypes } from 'mongoose';

import { ObjectIdScalar } from '../../../common/scalars/object-id.scalar';

@ObjectType()
export class ProductSimple {
  @Field(() => ObjectIdScalar)
  _id: MongooseTypes.ObjectId;

  @Field(() => String)
  name: string;
}
