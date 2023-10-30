import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from 'src/service/dashboard/dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from 'src/entity/my-property/my-property';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [TypeOrmModule.forFeature([Vehicle])],
  exports: [TypeOrmModule],
})
export class DashboardModule {}
