import { Test, TestingModule } from '@nestjs/testing';
import { CropController } from './crop.controller';
import { CropService } from './crop.service';
import { CreateCropDto } from './dtos/create-crop.dto';

describe('CropController', () => {
  let controller: CropController;
  let service: CropService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropController],
      providers: [
        {
          provide: CropService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CropController>(CropController);
    service = module.get<CropService>(CropService);
  });

  describe('create', () => {
    it('deve chamar service.create com os dados corretos', async () => {
      const dto: CreateCropDto = { name: 'Milho', harvestId: 'harv-1' };
      (service.create as jest.Mock).mockResolvedValue({ ...dto, id: '1' });
      const result = await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ ...dto, id: '1' });
    });
  });

  describe('findAll', () => {
    it('deve chamar service.findAll e retornar as culturas', async () => {
      const mockCrops = [{ id: '1', name: 'Milho', harvest: { property: {} } }];
      (service.findAll as jest.Mock).mockResolvedValue(mockCrops);
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockCrops);
    });
  });
});
