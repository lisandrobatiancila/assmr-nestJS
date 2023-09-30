/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account, User } from 'src/entity/signup/signup.entity';
import {
  ActiveUserCredentialsModel,
  UserSigninModel,
} from 'src/models/user/UserModel';
import { Repository } from 'typeorm';

@Injectable()
export class SigninService {
  constructor(
    @InjectRepository(User) private userCredential: Repository<User>,
    @InjectRepository(Account) private accountCred: Repository<Account>,
  ) {}
  async verifyUserCredentials(
    credentials: UserSigninModel,
  ): Promise<ResponseData<ActiveUserCredentialsModel>> {
    try {
      if (!Object.values(credentials).every((v) => v)) {
        return {
          code: 1,
          status: 500,
          message: 'Credentials is invalid.',
          data: null,
        };
      } else {
        const accountCred = await this.accountCred.findOne({
          select: {
            userId: true,
          },
          where: {
            email: credentials.email,
            password: credentials.password,
          },
        });

        if (!accountCred) {
          return {
            code: 0,
            status: 401,
            message: 'Credentials is invalid.',
            data: {
              email: '',
              firstname: '',
              middlename: '',
              lastname: '',
              address: '',
            },
          };
        }

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
            id: accountCred.userId,
          },
        });

        return {
          code: 0,
          status: 200,
          message: 'Credentials is valid.',
          data: {
            email: result.email,
            firstname: result.firstname,
            middlename: result.middlename,
            lastname: result.lastname,
            address: `${result.municipality}, ${result.province}, ${result.barangay}`,
          },
        };
      }
    } catch (err) {
      console.log(err);

      return new Promise((resolve, reject) => {
        resolve({
          code: 0,
          status: 500,
          message: 'Something went wrong.',
          data: {
            email: '',
            firstname: '',
            middlename: '',
            lastname: '',
            address: '',
          },
        });
      });
    }
  }
}