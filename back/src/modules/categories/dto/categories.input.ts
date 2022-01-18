import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  IsEnum
} from 'class-validator';

import { StatusEnum } from '../../../common/enums/status.enum';

registerEnumType(StatusEnum, {
  name: 'StatusEnum',
  description: 'Category status'
});

@InputType()
export class CreateCategoryInput {
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
}

@InputType()
export class UpdateCategoryInput {
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
}
