import { Controller, Get } from '@nestjs/common';
import { VehicleAssumptionModel } from 'src/models/property-assumptions/PropertyAssumptions';
import { PropertyAsssumptionsService } from 'src/service/property-asssumptions/property-asssumptions.service';

@Controller('property-assumptions')
export class PropertyAssumptionsController {
  constructor(private propAssumpService: PropertyAsssumptionsService) {}
  @Get('vehicle-assumption')
  getAllVehicle(): Promise<ResponseData<VehicleAssumptionModel[]>> {
    return this.propAssumpService.getAllVehicles();
  }
  // get all vehicle for assumptions
}
