import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types as MongooseTypes } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

import {
  CreateCategoryInput,
  UpdateCategoryInput
} from './dto/categories.input';
import { Category } from './model/categories.model';
import { CategoriesService } from './categories.service';
import { ObjectIdScalar } from '../../common/scalars/object-id.scalar';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  // QUERIES

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return await this.categoriesService.findAll();
  }

  @Query(() => Category)
  async category(
    @Args({ name: '_id', type: () => ObjectIdScalar })
    _id: MongooseTypes.ObjectId
  ): Promise<Category> {
    return await this.categoriesService.findOne(_id);
  }

  // MUTATIONS

  @Mutation(() => Category)
  async createCategory(
    @Args({ name: 'input', type: () => CreateCategoryInput })
    input: CreateCategoryInput
  ) {
    return await this.categoriesService.create(input);
  }

  @Mutation(() => Category, { name: 'updateCategory' })
  async updateCategory(
    @Args({ name: '_id', type: () => ObjectIdScalar })
    _id: MongooseTypes.ObjectId,
    @Args({ name: 'input', type: () => UpdateCategoryInput })
    input: UpdateCategoryInput
  ) {
    return await this.categoriesService.update(_id, input);
  }

  @Mutation(() => Category, { name: 'deleteCategory' })
  async deleteCategory(
    @Args({ name: '_id', type: () => ObjectIdScalar })
    _id: MongooseTypes.ObjectId
  ) {
    return await this.categoriesService.delete(_id);
  }
}
