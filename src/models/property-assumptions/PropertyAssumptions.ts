/* eslint-disable @typescript-eslint/no-unused-vars */
import { MyVehiclePropertyModel } from '../my-property/MyProperty';

interface OwnerInformationModel {
  firstname: string;
  middlename: string;
  lastname: string;
  contactno: string;
  address: string;
  email: string;
}

export interface VehicleAssumptionModel {
  ownerInfo: OwnerInformationModel;
  vehicleInfo: MyVehiclePropertyModel;
}
