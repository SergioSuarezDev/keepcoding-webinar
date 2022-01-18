import { Module } from '@nestjs/common';
import { GraphQLModule as GraphQL } from '@nestjs/graphql';
import { join } from 'path';

import { UpperCaseDirective } from '../../directives/uppercase.directive';

@Module({
  imports: [
    GraphQL.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      cors: {
        origin: '*',
        credentials: true
      },
      sortSchema: true,
      schemaDirectives: {
        upperCaseDirective: UpperCaseDirective
      },
      playground: true,
      introspection: true,
      debug: true
    })
  ],
  providers: [],
  exports: [GraphQL]
})
export class GraphQLModule {}
