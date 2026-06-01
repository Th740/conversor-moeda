import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConversionsModule } from './conversions/conversions.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/conversoes-db'),
    ConversionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}