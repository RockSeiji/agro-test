import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getSummary() {
    const [totalFarms, totalArea] = await Promise.all([
      this.prisma.property.count(),
      this.prisma.property.aggregate({ _sum: { totalArea: true } }),
    ]);

    const propertiesByState = await this.prisma.property.groupBy({ by: ['state'], _count: true });
    const cropsByName = await this.prisma.crop.groupBy({ by: ['name'], _count: true });
    const areaUsage = await this.prisma.property.aggregate({
      _sum: { arableArea: true, vegetationArea: true },
    });

    return {
      totalFarms,
      totalArea: totalArea._sum.totalArea ?? 0,
      farmsByState: propertiesByState.map(({ state, _count }) => ({ state, count: _count })),
      cropsDistribution: cropsByName.map(({ name, _count }) => ({ name, count: _count })),
      areaUsage: {
        arableArea: areaUsage._sum.arableArea ?? 0,
        vegetationArea: areaUsage._sum.vegetationArea ?? 0,
      },
    };
  }
}
