import { Controller, Get, Param } from '@nestjs/common';
import { DashboardService } from 'src/service/dashboard/dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashBoardService: DashboardService) {}
  @Get('/dashboard-graphs/:userId')
  getDashboardGraphs(@Param('userId') userId: string) {
    return this.dashBoardService.getDashboardGraphs(userId);
  }
}
