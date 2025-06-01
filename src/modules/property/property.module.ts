import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { PrismaService } from '@/database/prisma.service';

@Module({
  controllers: [PropertyController],
  providers: [PropertyService, PrismaService],
})
export class PropertyModule {}
