import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

describe('DashboardController', () => {
  let controller: DashboardController;
  let service: DashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        {
          provide: DashboardService,
          useValue: {
            getSummary: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
    service = module.get<DashboardService>(DashboardService);
  });

  describe('getSummary', () => {
    it('deve chamar service.getSummary e retornar os dados', async () => {
      const mockSummary = { totalFarms: 10, totalArea: 1000 };
      (service.getSummary as jest.Mock).mockResolvedValue(mockSummary);
      const result = await controller.getSummary();
      expect(service.getSummary).toHaveBeenCalled();
      expect(result).toEqual(mockSummary);
    });
  });
});
