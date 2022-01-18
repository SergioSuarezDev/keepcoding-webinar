import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { ObjectIdScalar } from '../../common/scalars/object-id.scalar';
import { Product, ProductSchema } from './model/products.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema
      }
    ])
  ],
  providers: [ProductsResolver, ProductsService, ObjectIdScalar]
})
export class ProductsModule {}
