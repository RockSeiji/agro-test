import { Test, TestingModule } from '@nestjs/testing';
import { HarvestModule } from './harvest.module';
import { HarvestService } from './harvest.service';
import { HarvestController } from './harvest.controller';
import { PrismaService } from '@/database/prisma.service';

describe('HarvestModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [HarvestModule],
    }).compile();
  });

  it('deve ser definido', () => {
    expect(module).toBeDefined();
  });

  it('deve fornecer HarvestService', () => {
    const service = module.get<HarvestService>(HarvestService);
    expect(service).toBeInstanceOf(HarvestService);
  });

  it('deve fornecer HarvestController', () => {
    const controller = module.get<HarvestController>(HarvestController);
    expect(controller).toBeInstanceOf(HarvestController);
  });

  it('deve fornecer PrismaService', () => {
    const prisma = module.get<PrismaService>(PrismaService);
    expect(prisma).toBeInstanceOf(PrismaService);
  });
});
