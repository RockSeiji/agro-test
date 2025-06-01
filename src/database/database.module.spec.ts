import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from './database.module';
import { PrismaService } from './prisma.service';

describe('DatabaseModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();
  });

  it('deve ser definido', () => {
    expect(module).toBeDefined();
  });

  it('deve fornecer PrismaService', () => {
    const prisma = module.get<PrismaService>(PrismaService);
    expect(prisma).toBeInstanceOf(PrismaService);
  });
});
