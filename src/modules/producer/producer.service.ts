import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { CreateProducerDto } from './dtos/create-producer.dto';
import { isValidCpfOrCnpj } from '@/common/Validations/validations';

@Injectable()
export class ProducerService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProducerDto) {
    if (!isValidCpfOrCnpj(data.cpfCnpj)) throw new BadRequestException('CPF ou CNPJ inválido.');
    
    return this.prisma.producer.create({ data });
  }

  async update(id: string, data: CreateProducerDto) {
    const existing = await this.prisma.producer.findUnique({ where: { id } });
    if (!existing) throw new BadRequestException('Produtor não encontrado');

    return this.prisma.producer.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.producer.findUnique({ where: { id } });
    if (!existing) throw new BadRequestException('Produtor não encontrado');

    return this.prisma.producer.delete({ where: { id } });
  }

  findAll() {
    return this.prisma.producer.findMany({ include: { properties: true } });
  }
}
