import { Test, TestingModule } from '@nestjs/testing';
import { ProducerService } from './producer.service';
import { PrismaService } from '@/database/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('ProducerService', () => {
  let service: ProducerService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerService,
        {
          provide: PrismaService,
          useValue: {
            producer: {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('deve criar um produtor válido', async () => {
      jest.spyOn(require('@/common/Validations/validations'), 'isValidCpfOrCnpj').mockReturnValue(true);
      const data = { cpfCnpj: '12345678901', name: 'João' };
      (prisma.producer.create as jest.Mock).mockResolvedValue({ ...data, id: '1' });
      const result = await service.create(data as any);
      expect(result).toEqual({ ...data, id: '1' });
      expect(prisma.producer.create).toHaveBeenCalledWith({ data });
    });

    it('deve lançar erro se CPF/CNPJ for inválido', () => {
      jest.spyOn(require('@/common/Validations/validations'), 'isValidCpfOrCnpj').mockReturnValue(false);
      const data = { cpfCnpj: '000', name: 'João' };
      expect(() => service.create(data as any)).toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('deve atualizar um produtor existente', async () => {
      (prisma.producer.findUnique as jest.Mock).mockResolvedValue({ id: '1' });
      (prisma.producer.update as jest.Mock).mockResolvedValue({ id: '1', name: 'Novo Nome' });
      const result = await service.update('1', { name: 'Novo Nome', cpfCnpj: '123' } as any);
      expect(result).toEqual({ id: '1', name: 'Novo Nome' });
    });

    it('deve lançar erro se produtor não existir', async () => {
      (prisma.producer.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.update('1', { name: 'Novo Nome', cpfCnpj: '123' } as any)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('deve remover um produtor existente', async () => {
      (prisma.producer.findUnique as jest.Mock).mockResolvedValue({ id: '1' });
      (prisma.producer.delete as jest.Mock).mockResolvedValue({ id: '1' });
      const result = await service.remove('1');
      expect(result).toEqual({ id: '1' });
    });

    it('deve lançar erro se produtor não existir', async () => {
      (prisma.producer.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.remove('1')).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os produtores', async () => {
      const mockProducers = [{ id: '1', name: 'João', cpfCnpj: '123', properties: [] }];
      (prisma.producer.findMany as jest.Mock).mockResolvedValue(mockProducers);
      const result = await service.findAll();
      expect(result).toEqual(mockProducers);
    });
  });
});
