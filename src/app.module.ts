import { Module } from '@nestjs/common';
import { ProducerModule } from './modules/producer/producer.module';
import { PropertyModule } from './modules/property/property.module';
import { HarvestModule } from './modules/harvest/harvest.module';
import { CropModule } from './modules/crop/crop.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/Errors/all-exceptions.filter';

@Module({
  imports: [
    DatabaseModule,
    ProducerModule,
    PropertyModule,
    HarvestModule,
    CropModule,
    DashboardModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    }
  ]
})
export class AppModule {}
