import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { CreateCropDto } from './dtos/create-crop.dto';

@Injectable()
export class CropService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCropDto) {
    const exists = await this.prisma.harvest.findUnique({ where: { id: data.harvestId } });
    if (!exists) throw new BadRequestException('Safra não encontrada.');
    return this.prisma.crop.create({ data });
  }

  findAll() {
    return this.prisma.crop.findMany({
      include: {
        harvest: { include: { property: true } },
      },
    });
  }
}
