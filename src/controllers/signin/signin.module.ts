import { Module } from '@nestjs/common';
import { SigninController } from './signin.controller';
import { SigninService } from 'src/service/signin/signin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, User } from 'src/entity/signup/signup.entity';

@Module({
  controllers: [SigninController],
  providers: [SigninService],
  imports: [TypeOrmModule.forFeature([User, Account])],
  exports: [TypeOrmModule], // important
})
export class SigninModule {}
