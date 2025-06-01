import { Test, TestingModule } from '@nestjs/testing';
import { CropService } from './crop.service';
import { PrismaService } from '@/database/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('CropService', () => {
  let service: CropService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropService,
        {
          provide: PrismaService,
          useValue: {
            crop: {
              create: jest.fn(),
              findMany: jest.fn(),
            },
            harvest: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CropService>(CropService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('deve criar uma cultura válida', async () => {
      const data = { name: 'Milho', harvestId: 'harv-1' };
      (prisma.harvest.findUnique as jest.Mock).mockResolvedValue({ id: 'harv-1' });
      (prisma.crop.create as jest.Mock).mockResolvedValue({ ...data, id: 'crop-1' });
      const result = await service.create(data as any);
      expect(result).toEqual({ ...data, id: 'crop-1' });
      expect(prisma.crop.create).toHaveBeenCalledWith({ data });
    });

    it('deve lançar erro se safra não existir', async () => {
      const data = { name: 'Milho', harvestId: 'harv-1' };
      (prisma.harvest.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.create(data as any)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('deve retornar todas as culturas', async () => {
      const mockCrops = [{ id: '1', name: 'Milho', harvest: { property: {} } }];
      (prisma.crop.findMany as jest.Mock).mockResolvedValue(mockCrops);
      const result = await service.findAll();
      expect(result).toEqual(mockCrops);
      expect(prisma.crop.findMany).toHaveBeenCalledWith({ include: { harvest: { include: { property: true } } } });
    });
  });
});
