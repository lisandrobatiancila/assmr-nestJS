import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entity/signup/signup.entity';
import { UserSignupModel } from 'src/models/user/UserModel';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SignupService {
    constructor(private dataSource: DataSource) {
        
    }
    async createUser(userForm: UserSignupModel): Promise<ResponseData<[]>> {
        const { firstname, middlename, lastname, contactno, gender, municipality, province, barangay, email, password } = userForm;

        await this.dataSource.createQueryBuilder()
            .insert()
            .into(Account)
            .values({
                firstname, middlename, lastname, contactno, gender, municipality, province, barangay, email, password
            })
            .execute();

        return {
            code: 0,
            status: 200,
            message: "New user created.",
            data: []
        }
    }
}
