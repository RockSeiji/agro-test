import { Test, TestingModule } from '@nestjs/testing';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dtos/create-property.dto';

describe('PropertyController', () => {
  let controller: PropertyController;
  let service: PropertyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyController],
      providers: [
        {
          provide: PropertyService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PropertyController>(PropertyController);
    service = module.get<PropertyService>(PropertyService);
  });

  describe('create', () => {
    it('deve chamar service.create com os dados corretos', async () => {
      const dto: CreatePropertyDto = {
        producerId: 'prod-1',
        name: 'Fazenda Feliz',
        city: 'Cidade',
        state: 'ST',
        totalArea: 100,
        arableArea: 60,
        vegetationArea: 40,
      };
      (service.create as jest.Mock).mockResolvedValue({ ...dto, id: '1' });
      const result = await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ ...dto, id: '1' });
    });
  });

  describe('findAll', () => {
    it('deve chamar service.findAll e retornar as propriedades', async () => {
      const mockProperties = [{ id: '1', name: 'Fazenda Feliz', producer: {}, harvests: [] }];
      (service.findAll as jest.Mock).mockResolvedValue(mockProperties);
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockProperties);
    });
  });
});
