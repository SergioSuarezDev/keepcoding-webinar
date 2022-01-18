import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';
import { Category, CategorySchema } from './model/categories.model';
import { ObjectIdScalar } from '../../common/scalars/object-id.scalar';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema
      }
    ])
  ],
  providers: [CategoriesResolver, CategoriesService, ObjectIdScalar]
})
export class CategoriesModule {}
