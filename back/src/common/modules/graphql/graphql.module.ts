import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule as GraphQL } from '@nestjs/graphql';
import { join } from 'path';

import { upperDirectiveTransformer } from '../../directives/uppercase.directive';

@Module({
  imports: [
    GraphQL.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      cors: {
        origin: '*',
        credentials: true
      },
      sortSchema: true,
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      playground: true,
      introspection: true,
      debug: true
    })
  ],
  providers: [],
  exports: [GraphQL]
})
export class GraphQLModule {}
