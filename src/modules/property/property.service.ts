import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { CreatePropertyDto } from './dtos/create-property.dto';

@Injectable()
export class PropertyService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePropertyDto) {
    const { totalArea, arableArea, vegetationArea } = data;

    if (arableArea + vegetationArea > totalArea) {
      throw new BadRequestException('Soma da área agricultável e vegetação não pode exceder total.');
    }

    const producer = await this.prisma.producer.findUnique({ where: { id: data.producerId } });
    if (!producer) throw new BadRequestException('Produtor não encontrado.');

    return this.prisma.property.create({ data });
  }

  findAll() {
    return this.prisma.property.findMany({ include: { producer: true, harvests: true } });
  }
}
