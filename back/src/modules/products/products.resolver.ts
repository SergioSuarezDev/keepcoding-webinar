import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Types as MongooseTypes } from 'mongoose';

import { ProductsService } from './products.service';
import { Product } from './model/products.model';
import { CreateProductInput, UpdateProductInput } from './dto/products.input';
import { ObjectIdScalar } from 'src/common/scalars/object-id.scalar';
import { ProductSimple } from './dto/product-simple.dto';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  // QUERIES

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Query(() => Product)
  async product(
    @Args({ name: '_id', type: () => ObjectIdScalar })
    _id: MongooseTypes.ObjectId
  ): Promise<Product> {
    return await this.productsService.findOne(_id);
  }

  @Query(() => ProductSimple)
  async productSimple(
    @Args({ name: '_id', type: () => ObjectIdScalar })
    _id: MongooseTypes.ObjectId
  ): Promise<Product> {
    return await this.productsService.findOneSimple(_id);
  }

  // MUTATIONS
  @Mutation(() => Product)
  async createProduct(
    @Args({ name: 'input', type: () => CreateProductInput })
    input: CreateProductInput
  ) {
    return await this.productsService.create(input);
  }

  @Mutation(() => Product, { name: 'updateProduct' })
  async updateProduct(
    @Args({ name: '_id', type: () => ObjectIdScalar })
    _id: MongooseTypes.ObjectId,
    @Args({ name: 'input', type: () => UpdateProductInput })
    input: UpdateProductInput
  ) {
    return await this.productsService.update(_id, input);
  }

  @Mutation(() => Product, { name: 'deleteProduct' })
  async deleteProduct(
    @Args({ name: '_id', type: () => ObjectIdScalar })
    _id: MongooseTypes.ObjectId
  ) {
    return await this.productsService.delete(_id);
  }
}
