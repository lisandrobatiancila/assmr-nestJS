import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  CertainVehicleModel,
  PropertyAssumptionModel,
  VehicleAssumptionModel,
} from 'src/models/property-assumptions/PropertyAssumptions';
import { PropertyAsssumptionsService } from 'src/service/property-asssumptions/property-asssumptions.service';

@Controller('property-assumptions')
export class PropertyAssumptionsController {
  constructor(private propAssumpService: PropertyAsssumptionsService) {}
  @Get('vehicle-assumption')
  getAllVehicle(): Promise<ResponseData<VehicleAssumptionModel[]>> {
    return this.propAssumpService.getAllVehicles();
  }
  // getAllVehicleBackUp(): Promise<ResponseData<VehicleAssumptionModel[]>> {
  //   return this.propAssumpService.getAllVehicles();
  // }
  // get all vehicle for assumptions
  @Get('vehicle-info/:vehicleId')
  getVehicleInfo(@Param('vehicleId') vehicleId: number) {
    this.propAssumpService.assumeVehicleProperty(null);
  } // get certain vehicle info
  @Post('vehicle-assumption')
  assumeVehicleProperty(
    @Body() assumptBody: PropertyAssumptionModel,
  ): Promise<ResponseData<string>> {
    return this.propAssumpService.assumeVehicleProperty(assumptBody);
  }
  @Get('/certain-vehicle/:vehicleId')
  getCertainVehicle(
    @Param() vehicleId: { vehicleId: number },
  ): Promise<ResponseData<CertainVehicleModel[]>> {
    return this.propAssumpService.getCertainVehicle(vehicleId);
  }
}
