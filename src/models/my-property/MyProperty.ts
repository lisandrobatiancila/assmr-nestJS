export interface UploadVehiclePropertyModel {
    brand: string,
    model: string,
    owner: string,
    downpayment: string,
    location: string,
    installmentpaid: string,
    installmentduration: string,
    delinquent: string,
    fileInformation: UploadVehicleIMGPropertyModel
} // used this model when user POST a vehicle property

export interface UploadVehicleIMGPropertyModel {
    fileCopyUri: any,
    name: string,
    size: number,
    type: string,
    uri: string
} // used this model when user POST an image of vehicle property