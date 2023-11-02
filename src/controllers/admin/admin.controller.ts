import { Controller, Get } from '@nestjs/common';
import { AdminService } from 'src/service/admin/admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Get('histories')
  getHistory() {
    return this.adminService.getHistory();
  }
}
