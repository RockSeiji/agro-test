import { Test, TestingModule } from '@nestjs/testing';
import { CropModule } from './crop.module';
import { CropService } from './crop.service';
import { CropController } from './crop.controller';
import { PrismaService } from '@/database/prisma.service';

describe('CropModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [CropModule],
    }).compile();
  });

  it('deve ser definido', () => {
    expect(module).toBeDefined();
  });

  it('deve fornecer CropService', () => {
    const service = module.get<CropService>(CropService);
    expect(service).toBeInstanceOf(CropService);
  });

  it('deve fornecer CropController', () => {
    const controller = module.get<CropController>(CropController);
    expect(controller).toBeInstanceOf(CropController);
  });

  it('deve fornecer PrismaService', () => {
    const prisma = module.get<PrismaService>(PrismaService);
    expect(prisma).toBeInstanceOf(PrismaService);
  });
});
