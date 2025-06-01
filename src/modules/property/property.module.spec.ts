import { Test, TestingModule } from '@nestjs/testing';
import { PropertyModule } from './property.module';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { PrismaService } from '@/database/prisma.service';

describe('PropertyModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [PropertyModule],
    }).compile();
  });

  it('deve ser definido', () => {
    expect(module).toBeDefined();
  });

  it('deve fornecer PropertyService', () => {
    const service = module.get<PropertyService>(PropertyService);
    expect(service).toBeInstanceOf(PropertyService);
  });

  it('deve fornecer PropertyController', () => {
    const controller = module.get<PropertyController>(PropertyController);
    expect(controller).toBeInstanceOf(PropertyController);
  });

  it('deve fornecer PrismaService', () => {
    const prisma = module.get<PrismaService>(PrismaService);
    expect(prisma).toBeInstanceOf(PrismaService);
  });
});
