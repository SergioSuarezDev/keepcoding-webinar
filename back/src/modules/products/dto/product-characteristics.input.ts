import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';

@InputType()
export class ProductCharacteristicsInput {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String, { nullable: true })
  one: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String, { nullable: true })
  two: string;
}
