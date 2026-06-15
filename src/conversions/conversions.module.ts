import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConversionsController } from './conversions.controller';
import { ConversionsService } from './conversions.service';
import { Conversion, ConversionSchema } from './entities/conversion.schema';

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
  exports: [ConversionsService],
})
export class ConversionsModule {}
