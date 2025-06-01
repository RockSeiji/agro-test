import { Test, TestingModule } from '@nestjs/testing';
import { DashboardModule } from './dashboard.module';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { PrismaService } from '@/database/prisma.service';

describe('DashboardModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [DashboardModule],
    }).compile();
  });

  it('deve ser definido', () => {
    expect(module).toBeDefined();
  });

  it('deve fornecer DashboardService', () => {
    const service = module.get<DashboardService>(DashboardService);
    expect(service).toBeInstanceOf(DashboardService);
  });

  it('deve fornecer DashboardController', () => {
    const controller = module.get<DashboardController>(DashboardController);
    expect(controller).toBeInstanceOf(DashboardController);
  });

  it('deve fornecer PrismaService', () => {
    const prisma = module.get<PrismaService>(PrismaService);
    expect(prisma).toBeInstanceOf(PrismaService);
  });
});
