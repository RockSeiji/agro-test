import { Module } from '@nestjs/common';
import { CropController } from './crop.controller';
import { CropService } from './crop.service';
import { PrismaService } from '@/database/prisma.service';

@Module({
  controllers: [CropController],
  providers: [CropService, PrismaService],
})
export class CropModule {}
