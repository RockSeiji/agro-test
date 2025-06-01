import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { PrismaService } from '@/database/prisma.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: PrismaService,
          useValue: {
            property: {
              count: jest.fn(),
              aggregate: jest.fn(),
              groupBy: jest.fn(),
            },
            crop: {
              groupBy: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('getSummary', () => {
    it('deve retornar o resumo do dashboard', async () => {
      (prisma.property.count as jest.Mock).mockResolvedValue(10);
      (prisma.property.aggregate as jest.Mock).mockResolvedValue({ _sum: { totalArea: 1000, arableArea: 600, vegetationArea: 400 } });
      (prisma.property.groupBy as jest.Mock).mockResolvedValue([
        { state: 'SP', _count: 5 },
        { state: 'MG', _count: 5 },
      ]);
      (prisma.crop.groupBy as jest.Mock).mockResolvedValue([
        { name: 'Soja', _count: 6 },
        { name: 'Milho', _count: 4 },
      ]);

      const result = await service.getSummary();
      expect(result).toEqual({
        totalFarms: 10,
        totalArea: 1000,
        farmsByState: [
          { state: 'SP', count: 5 },
          { state: 'MG', count: 5 },
        ],
        cropsDistribution: [
          { name: 'Soja', count: 6 },
          { name: 'Milho', count: 4 },
        ],
        areaUsage: {
          arableArea: 600,
          vegetationArea: 400,
        },
      });
      expect(prisma.property.count).toHaveBeenCalled();
      expect(prisma.property.aggregate).toHaveBeenCalled();
      expect(prisma.property.groupBy).toHaveBeenCalled();
      expect(prisma.crop.groupBy).toHaveBeenCalled();
    });

    it('deve retornar 0 para áreas nulas', async () => {
      (prisma.property.count as jest.Mock).mockResolvedValue(0);
      (prisma.property.aggregate as jest.Mock).mockResolvedValue({ _sum: { totalArea: null, arableArea: null, vegetationArea: null } });
      (prisma.property.groupBy as jest.Mock).mockResolvedValue([]);
      (prisma.crop.groupBy as jest.Mock).mockResolvedValue([]);

      const result = await service.getSummary();
      expect(result.totalArea).toBe(0);
      expect(result.areaUsage.arableArea).toBe(0);
      expect(result.areaUsage.vegetationArea).toBe(0);
    });
  });
});
