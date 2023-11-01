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
  vehicle_id: number;
  vehicle_userId: number;
  vehicle_brand: string;
  vehicle_model: string;
  vehicle_owner: string;
  vehicle_downpayment: string;
  vehicle_location: string;
  vehicle_installmentpaid: string;
  vehicle_installmentduration: string;
  vehicle_delinquent: string;
  vehicle_description: string;
  vehicle_isDropped: string;
  vehicle_image_id: number;
  vehicle_image_vehicleId: number;
  vehicle_image_vehicleFrontIMG: string;
  vehicle_image_vehicleRightIMG: string;
  vehicle_image_vehicleLeftIMG: string;
  vehicle_image_vehicleBackIMG: '';
  vehicle_image_vehicleCRIMG: string;
  vehicle_image_vehicleORIMG: string;
  totalAssumption: number;
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

export interface MyAssumedProperty {
  id: number;
  email: string;
  firstname: string;
  middlename: string;
  lastname: string;
  contactno: string;
  municipality: string;
  province: string;
  barangay: string;
  property: UpdateVehicleInformationModel;
}

export interface AssumerListModel {
  assumer_id: number;
  assumer_userId: number;
  assumer_assumer_income: string;
  assumer_assumer_work: string;
  asmpt_id: number;
  asmpt_userId: number;
  asmpt_property_id: number;
  asmpt_assumerId: number;
  asmpt_propowner_id: number;
  asmpt_isActive: string;
  asmpt_transaction_date: string;
  user_id: number;
  user_email: string;
  user_firstname: string;
  user_middlename: string;
  user_lastname: string;
  user_contactno: string;
  user_gender: string;
  user_municipality: string;
  user_province: string;
  user_barangay: string;
}

export interface MyJewelryPropertyModel {
  jewelry_id: number;
  jewelry_jewelry_owner: string;
  jewelry_jewelry_name: string;
  jewelry_jewelry_model: string;
  jewelry_jewelry_downpayment: string;
  jewelry_jewelry_location: string;
  jewelry_jewelry_delinquent: string;
  jewelry_jewelry_installmentpaid: string;
  jewelry_jewelry_installmentduration: string;
  jewelry_jewelry_description: string;
  jewelry_jewelry_karat: string;
  jewelry_jewelry_grams: string;
  jewelry_jewelry_material: string;
  jewelry_jewelry_image: string;
  jewelry_userId: number;
} // used this when fetching jewelry property

export interface UpdateJewelryInformationModel {
  id: number; // jewelryID
  jewelryName: string;
  jewelryModel: string;
  owner: string;
  downpayment: string;
  location: string;
  installmentpaid: string;
  installmentduration: string;
  delinquent: string;
  description: string;
  karat: string;
  grams: string;
  material: string;
}

export interface UploadJewelryInformationModel {
  
}