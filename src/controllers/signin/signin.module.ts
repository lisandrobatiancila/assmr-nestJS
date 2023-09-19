import { Module } from '@nestjs/common';
import { SigninController } from './signin.controller';
import { SigninService } from 'src/service/signin/signin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entity/signup/signup.entity';

@Module({
  controllers: [SigninController],
  providers: [SigninService],
  imports: [TypeOrmModule.forFeature([Account])],
  exports: [TypeOrmModule]
})
export class SigninModule {}
