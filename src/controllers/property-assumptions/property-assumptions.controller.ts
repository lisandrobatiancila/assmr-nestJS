import { Controller, Get } from '@nestjs/common';
import { PropertyAsssumptionsService } from 'src/service/property-asssumptions/property-asssumptions.service';

@Controller('property-assumptions')
export class PropertyAssumptionsController {
  constructor(private propAssumpService: PropertyAsssumptionsService) {}
  @Get('vehicle-assumption')
  getAllVehicle() {
    this.propAssumpService.getAllVehicles();
  }
  // get all vehicle for assumptions
}
