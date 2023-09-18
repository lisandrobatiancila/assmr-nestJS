import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entity/signup/signup.entity';
import { ActiveUserCredentialsModel, UserSigninModel } from 'src/models/user/UserModel';
import { Repository } from 'typeorm';

@Injectable()
export class SigninService {
    constructor(@InjectRepository(Account) private userCredential: Repository<Account>) {

    }
    async verifyUserCredentials(credentials: UserSigninModel): Promise<ResponseData<ActiveUserCredentialsModel>> {        
        if(!Object.values(credentials).every(v => v)){
            return {
                code: 1,
                status: 500,
                message: "Credentials is invalid.",
                data: null
            }
        }
        else {
            const result = await this.userCredential.findOne({
                select: {
                    email: true,
                    firstname: true,
                    middlename: true,
                    lastname: true,
                    contactno: true,
                    municipality: true,
                    province: true,
                    barangay: true,
                },
                where: {
                    email: credentials.email,
                    password: credentials.password
                }
            });
            
            if(!result) {
                return {
                    code: 0,
                    status: 401,
                    message: "Credentials is valid.",
                    data: {
                        email: '',
                        firstname: '',
                        middlename: '',
                        lastname: '',
                        address: ''
                    }
                }
            }
            
            return {
                code: 0,
                status: 200,
                message: "Credentials is valid.",
                data: {
                    email: result.email,
                    firstname: result.firstname,
                    middlename: result.middlename,
                    lastname: result.lastname,
                    address: `${result.municipality}, ${result.province}, ${result.barangay}`
                }
            }
        }
    }
}
