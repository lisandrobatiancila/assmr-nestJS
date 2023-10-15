import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ActiveUserCredentialsModel,
  UpdateUserInformationModel,
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
  @Post('updateCredentials')
  async updateCredentials(
    @Body() params: UpdateUserInformationModel,
  ): Promise<ResponseData<string>> {
    return this.signinService.updateCredentials(params);
  }
  @Get('getPassword/:userEmail')
  getPassword(@Param() param: { userEmail: string }) {
    const { userEmail } = param;
    return this.signinService.getPassword(userEmail);
  }
}
