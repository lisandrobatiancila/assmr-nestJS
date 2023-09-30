import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account, User } from 'src/entity/signup/signup.entity';
import { UserSignupModel } from 'src/models/user/UserModel';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SignupService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Account) private accountEntity: Repository<Account>,
  ) {}
  async createUser(userForm: UserSignupModel): Promise<ResponseData<[]>> {
    const {
      firstname,
      middlename,
      lastname,
      contactno,
      gender,
      municipality,
      province,
      barangay,
      email,
      password,
    } = userForm;

    const user = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        firstname,
        middlename,
        lastname,
        contactno,
        gender,
        municipality,
        province,
        barangay,
        email,
      })
      .execute();

    this.accountEntity
      .createQueryBuilder()
      .insert()
      .into(Account)
      .values({
        userId: user.raw.insertId,
        email,
        password,
      })
      .execute();

    return {
      code: 0,
      status: 200,
      message: 'New user created.',
      data: [],
    };
  }
}
