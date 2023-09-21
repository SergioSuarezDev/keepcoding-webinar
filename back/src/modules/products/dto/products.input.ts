import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  IsEnum,
  IsArray,
  IsObject
} from 'class-validator';

import { StatusEnum } from '../../../common/enums/status.enum';
import { ObjectIdScalar } from '../../../common/scalars/object-id.scalar';
import { ProductCharacteristicsInput } from './product-characteristics.input';

registerEnumType(StatusEnum, {
  name: 'StatusEnum',
  description: 'Category status'
});

@InputType()
export class CreateProductInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String)
  description: string;

  @IsNotEmpty()
  @IsEnum(StatusEnum)
  @Field(() => StatusEnum)
  status: StatusEnum;

  @IsOptional()
  @IsArray()
  @Field(() => [ObjectIdScalar], { nullable: true })
  categories?: ObjectIdScalar[];

  @IsOptional()
  @IsNumber()
  @Field(() => Float)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Float)
  percentDiscount?: number;

  @IsOptional()
  @IsObject()
  @Field(() => ProductCharacteristicsInput, { nullable: true })
  characteristics: ProductCharacteristicsInput;
}

@InputType()
export class UpdateProductInput {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String, { nullable: true })
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String, { nullable: true })
  description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(StatusEnum)
  @Field(() => StatusEnum, { nullable: true })
  status: StatusEnum;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Float)
  price?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Float)
  percentDiscount?: number;

  @IsOptional()
  @IsArray()
  @Field(() => [ObjectIdScalar], { nullable: true })
  categories?: ObjectIdScalar[];

  @IsOptional()
  @IsObject()
  @Field(() => ProductCharacteristicsInput, { nullable: true })
  characteristics: ProductCharacteristicsInput;
}
