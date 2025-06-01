import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { CreateHarvestDto } from './dtos/create-harvest.dto';

@Injectable()
export class HarvestService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateHarvestDto) {
    const exists = await this.prisma.property.findUnique({ where: { id: data.propertyId } });
    if (!exists) throw new BadRequestException('Propriedade não encontrada.');
    return this.prisma.harvest.create({ data });
  }

  findAll() {
    return this.prisma.harvest.findMany({ include: { property: true, crops: true } });
  }
}
