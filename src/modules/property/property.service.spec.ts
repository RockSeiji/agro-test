import { Test, TestingModule } from '@nestjs/testing';
import { PropertyService } from './property.service';
import { PrismaService } from '@/database/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('PropertyService', () => {
  let service: PropertyService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyService,
        {
          provide: PrismaService,
          useValue: {
            property: {
              create: jest.fn(),
              findMany: jest.fn(),
            },
            producer: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PropertyService>(PropertyService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('deve criar uma propriedade válida', async () => {
      const data = {
        producerId: 'prod-1',
        name: 'Fazenda Feliz',
        city: 'Cidade',
        state: 'ST',
        totalArea: 100,
        arableArea: 60,
        vegetationArea: 40,
      };
      (prisma.producer.findUnique as jest.Mock).mockResolvedValue({ id: 'prod-1' });
      (prisma.property.create as jest.Mock).mockResolvedValue({ ...data, id: 'prop-1' });
      const result = await service.create(data as any);
      expect(result).toEqual({ ...data, id: 'prop-1' });
      expect(prisma.property.create).toHaveBeenCalledWith({ data });
    });

    it('deve lançar erro se soma das áreas exceder o total', async () => {
      const data = {
        producerId: 'prod-1',
        name: 'Fazenda Feliz',
        city: 'Cidade',
        state: 'ST',
        totalArea: 50,
        arableArea: 30,
        vegetationArea: 30,
      };
      await expect(service.create(data as any)).rejects.toThrow(BadRequestException);
    });

    it('deve lançar erro se produtor não existir', async () => {
      const data = {
        producerId: 'prod-1',
        name: 'Fazenda Feliz',
        city: 'Cidade',
        state: 'ST',
        totalArea: 100,
        arableArea: 60,
        vegetationArea: 40,
      };
      (prisma.producer.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.create(data as any)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('deve retornar todas as propriedades', async () => {
      const mockProperties = [{ id: '1', name: 'Fazenda Feliz', producer: {}, harvests: [] }];
      (prisma.property.findMany as jest.Mock).mockResolvedValue(mockProperties);
      const result = await service.findAll();
      expect(result).toEqual(mockProperties);
      expect(prisma.property.findMany).toHaveBeenCalledWith({ include: { producer: true, harvests: true } });
    });
  });
});
