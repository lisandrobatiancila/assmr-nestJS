export interface UserSignupModel {
  firstname: string;
  middlename: string;
  lastname: string;
  contactno: string;
  gender: string | null;
  municipality: string | null;
  province: string | null;
  barangay: string | null;
  email: string;
  password: string;
} // mo create ug account ang user

export interface UserSigninModel {
  email: string;
  password: string;
} // basta mo login ang user

export interface ActiveUserCredentialsModel {
  email: string;
  firstname: string;
  middlename: string;
  lastname: string;
  address: string;
} // basta accepted ang credentials sa user mao ni e return na mga info

export interface VehicleOwnerModel {
  email: string;
  brand: string;
  model: string;
  owner: string;
  downpayment: string;
  location: string;
  installmentpaid: string;
  installmentduration: string;
  delinquent: string;
  description: string;
} // used for uploading vehicle property
