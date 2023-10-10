export interface UploadVehiclePropertyModel {
  brand: string;
  model: string;
  owner: string;
  downpayment: string;
  location: string;
  installmentpaid: string;
  installmentduration: string;
  delinquent: string;
  fileInformation: UploadVehicleIMGPropertyModel;
} // used this model when user POST a vehicle property

export interface UploadVehicleIMGPropertyModel {
  fileCopyUri: any;
  name: string;
  size: number;
  type: string;
  uri: string;
} // used this model when user POST an image of vehicle property

export interface MyVehiclePropertyModel {
  id: number;
  userID?: number;
  brand: string;
  model: string;
  owner: string;
  downpayment: string;
  location: string;
  installmentpaid: string;
  installmentduration: string;
  delinquent: string;
  description: string;
  vehicleIMG?: MyVehicleIMGModel;
} // used this when fetching vehicle properties from DB

export interface MyVehicleIMGModel {
  id: number;
  vehicleID: number;
  vehicleForntIMG: string;
  vehicleRightIMG: string;
  vehicleLeftIMG: string;
  vehicleBackIMG: string;
  vehicleCRIMG: string;
  vehicleORIMG: string;
} // used this when fetching vehicle images from DB

export interface UpdateVehicleInformationModel {
  id: number; // vehicleID
  brand: string;
  model: string;
  owner: string;
  downpayment: string;
  location: string;
  installmentpaid: string;
  installmentduration: string;
  delinquent: string;
  description: string;
}
