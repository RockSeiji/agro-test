import { Test, TestingModule } from '@nestjs/testing';
import { HarvestController } from './harvest.controller';
import { HarvestService } from './harvest.service';
import { CreateHarvestDto } from './dtos/create-harvest.dto';

describe('HarvestController', () => {
  let controller: HarvestController;
  let service: HarvestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvestController],
      providers: [
        {
          provide: HarvestService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HarvestController>(HarvestController);
    service = module.get<HarvestService>(HarvestService);
  });

  describe('create', () => {
    it('deve chamar service.create com os dados corretos', async () => {
      const dto: CreateHarvestDto = { year: 2025, propertyId: 'prop-1' };
      (service.create as jest.Mock).mockResolvedValue({ ...dto, id: '1' });
      const result = await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ ...dto, id: '1' });
    });
  });

  describe('findAll', () => {
    it('deve chamar service.findAll e retornar as safras', async () => {
      const mockHarvests = [{ id: '1', year: 2025, property: {}, crops: [] }];
      (service.findAll as jest.Mock).mockResolvedValue(mockHarvests);
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockHarvests);
    });
  });
});
