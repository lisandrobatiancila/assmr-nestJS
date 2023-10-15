/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account, User } from 'src/entity/signup/signup.entity';
import {
  ActiveUserCredentialsModel,
  UpdateUserInformationModel,
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
              userId: 0,
              email: '',
              firstname: '',
              middlename: '',
              lastname: '',
              address: '',
              contactno: '',
            },
          };
        }

        const result = await this.userCredential.findOne({
          select: {
            id: true,
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
            userId: result.id,
            email: result.email,
            firstname: result.firstname,
            middlename: result.middlename,
            lastname: result.lastname,
            address: `${result.municipality}, ${result.province}, ${result.barangay}`,
            contactno: result.contactno,
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
            userId: 0,
            email: '',
            firstname: '',
            middlename: '',
            lastname: '',
            address: '',
            contactno: '',
          },
        });
      });
    }
  }
  async updateCredentials(
    params: UpdateUserInformationModel,
  ): Promise<ResponseData<string>> {
    const { firstname, middlename, lastname, contactno, email, password } =
      params;

    this.accountCred
      .createQueryBuilder('account')
      .update(Account)
      .set({
        password: password,
      })
      .where('account.email =:email', { email })
      .execute();

    this.userCredential
      .createQueryBuilder('user')
      .update(User)
      .set({
        firstname: firstname.toLocaleLowerCase(),
        middlename: middlename.toLocaleLowerCase(),
        lastname: lastname.toLocaleLowerCase(),
        contactno,
      })
      .where('user.email =:email', { email })
      .execute();

    return {
      code: 200,
      status: 1,
      message: 'Credential was updated',
      data: 'Credential was updated successfully.',
    };
  }
  async getPassword(userEmail: string): Promise<ResponseData<string>> {
    const Accpass = await this.accountCred.findOne({
      select: {
        password: true,
      },
      where: {
        email: userEmail,
      },
    });
    const password = Accpass.password;

    return {
      code: 200,
      status: 1,
      message: 'Get password',
      data: password,
    };
  }
}
