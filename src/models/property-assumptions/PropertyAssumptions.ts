/* eslint-disable @typescript-eslint/no-unused-vars */
import { MyVehiclePropertyModel } from '../my-property/MyProperty';

interface OwnerInformationModel {
  id: number,
  firstname: string;
  middlename: string;
  lastname: string;
  contactno: string;
  municipality: string;
  province: string,
  barangay: string,
  email: string;
} // displaying properties, ready for assumption

export interface VehicleAssumptionModel extends OwnerInformationModel {
} // for displaying properties, ready for assumption
