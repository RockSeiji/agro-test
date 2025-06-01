import { Test, TestingModule } from '@nestjs/testing';
import { HarvestService } from './harvest.service';
import { PrismaService } from '@/database/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('HarvestService', () => {
  let service: HarvestService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HarvestService,
        {
          provide: PrismaService,
          useValue: {
            harvest: {
              create: jest.fn(),
              findMany: jest.fn(),
            },
            property: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<HarvestService>(HarvestService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('deve criar uma safra válida', async () => {
      const data = { year: 2025, propertyId: 'prop-1' };
      (prisma.property.findUnique as jest.Mock).mockResolvedValue({ id: 'prop-1' });
      (prisma.harvest.create as jest.Mock).mockResolvedValue({ ...data, id: 'harv-1' });
      const result = await service.create(data as any);
      expect(result).toEqual({ ...data, id: 'harv-1' });
      expect(prisma.harvest.create).toHaveBeenCalledWith({ data });
    });

    it('deve lançar erro se propriedade não existir', async () => {
      const data = { year: 2025, propertyId: 'prop-1' };
      (prisma.property.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.create(data as any)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('deve retornar todas as safras', async () => {
      const mockHarvests = [{ id: '1', year: 2025, property: {}, crops: [] }];
      (prisma.harvest.findMany as jest.Mock).mockResolvedValue(mockHarvests);
      const result = await service.findAll();
      expect(result).toEqual(mockHarvests);
      expect(prisma.harvest.findMany).toHaveBeenCalledWith({ include: { property: true, crops: true } });
    });
  });
});
