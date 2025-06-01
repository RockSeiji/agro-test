import { Test, TestingModule } from '@nestjs/testing';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';
import { CreateProducerDto } from './dtos/create-producer.dto';
import { UpdateProducerDto } from './dtos/update-producer.dto';


describe('ProducerController', () => {
  let controller: ProducerController;
  let service: ProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerController],
      providers: [
        {
          provide: ProducerService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProducerController>(ProducerController);
    service = module.get<ProducerService>(ProducerService);
  });

  describe('create', () => {
    it('deve chamar service.create com os dados corretos', async () => {
      const dto: CreateProducerDto = { cpfCnpj: '123', name: 'João' };
      (service.create as jest.Mock).mockResolvedValue({ ...dto, id: '1' });
      const result = await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ ...dto, id: '1' });
    });
  });

  describe('update', () => {
    it('deve chamar service.update com os dados corretos', async () => {
      const dto: UpdateProducerDto = { cpfCnpj: '123', name: 'João' };
      (service.update as jest.Mock).mockResolvedValue({ ...dto, id: '1' });
      const result = await controller.update('1', dto);
      expect(service.update).toHaveBeenCalledWith('1', dto);
      expect(result).toEqual({ ...dto, id: '1' });
    });
  });

  describe('remove', () => {
    it('deve chamar service.remove com o id correto', async () => {
      (service.remove as jest.Mock).mockResolvedValue({ id: '1' });
      const result = await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith('1');
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('findAll', () => {
    it('deve chamar service.findAll e retornar os produtores', async () => {
      const mockProducers = [{ id: '1', name: 'João', cpfCnpj: '123', properties: [] }];
      (service.findAll as jest.Mock).mockResolvedValue(mockProducers);
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockProducers);
    });
  });
});
