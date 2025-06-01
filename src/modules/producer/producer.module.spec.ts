import { Test, TestingModule } from '@nestjs/testing';
import { ProducerModule } from './producer.module';
import { ProducerService } from './producer.service';
import { ProducerController } from './producer.controller';
import { PrismaService } from '@/database/prisma.service';

describe('ProducerModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ProducerModule],
    }).compile();
  });

  it('deve ser definido', () => {
    expect(module).toBeDefined();
  });

  it('deve fornecer ProducerService', () => {
    const service = module.get<ProducerService>(ProducerService);
    expect(service).toBeInstanceOf(ProducerService);
  });

  it('deve fornecer ProducerController', () => {
    const controller = module.get<ProducerController>(ProducerController);
    expect(controller).toBeInstanceOf(ProducerController);
  });

  it('deve fornecer PrismaService', () => {
    const prisma = module.get<PrismaService>(PrismaService);
    expect(prisma).toBeInstanceOf(PrismaService);
  });
});
