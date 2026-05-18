import { Module } from '@nestjs/common';
import { ConversionsService } from './conversions.service';
import { ConversionsController } from './conversions.controller';

@Module({
  controllers: [ConversionsController],
  providers: [ConversionsService],
})
export class ConversionsModule {}
