import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsGateway } from './events.gateway';

@Module({
  providers: [EventsGateway, EventsService],
  exports: [EventsService]
})
export class EventsModule {}
