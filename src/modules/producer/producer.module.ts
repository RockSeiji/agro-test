import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ProducerController } from './producer.controller';
import { PrismaService } from '@/database/prisma.service';

@Module({
  controllers: [ProducerController],
  providers: [ProducerService, PrismaService],
})
export class ProducerModule {}
