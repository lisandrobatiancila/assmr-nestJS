import { Body, Controller, Post } from '@nestjs/common';
import {
  ActiveUserCredentialsModel,
  UserSigninModel,
} from 'src/models/user/UserModel';
import { SigninService } from 'src/service/signin/signin.service';
import { DataSource } from 'typeorm';

@Controller('signin')
export class SigninController {
  constructor(
    private signinService: SigninService,
    private dataSource: DataSource,
  ) {}

  @Post()
  async signinUserCredentials(
    @Body() userCredentials: UserSigninModel,
  ): Promise<ResponseData<ActiveUserCredentialsModel>> {
    return this.signinService.verifyUserCredentials(userCredentials);
  }
}
