import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConversionsService } from './conversions.service';
import { ConversionsController } from './conversions.controller';

import {
  Conversion,
  ConversionSchema,
} from './entities/conversion.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Conversion.name,
        schema: ConversionSchema,
      },
    ]),
  ],
  controllers: [ConversionsController],
  providers: [ConversionsService],
})
export class ConversionsModule {}