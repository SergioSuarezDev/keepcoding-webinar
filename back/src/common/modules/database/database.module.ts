import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://TestUser:TestPassword@localhost:27017/TestDB?authSource=TestDB'
    )
  ],

  providers: [],
  exports: [MongooseModule]
})
export class DatabaseModule {}
