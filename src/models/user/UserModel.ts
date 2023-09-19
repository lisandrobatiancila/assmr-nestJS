export interface UserSignupModel {
    firstname: string,
    middlename: string,
    lastname: string,
    contactno: string,
    gender: string | null,
    municipality: string | null,
    province: string | null,
    barangay: string | null,
    email: string,
    password: string
}

export interface UserSigninModel {
    email: string,
    password: string
}

export interface ActiveUserCredentialsModel {
    email: string,
    firstname: string,
    middlename: string,
    lastname: string,
    address: string
}
