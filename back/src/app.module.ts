import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/modules/database/database.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { GraphQLModule } from './common/modules/graphql/graphql.module';

@Module({
  imports: [GraphQLModule, DatabaseModule, ProductsModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
