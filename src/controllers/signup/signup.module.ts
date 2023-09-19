import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from 'src/service/signup/signup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Account } from 'src/entity/signup/signup.entity';

@Module({
  controllers: [SignupController],
  providers: [SignupService],
  imports: [TypeOrmModule.forFeature([Account])]
})
export class SignupModule {
  constructor(private dataSource: DataSource) {
    
  }
}
