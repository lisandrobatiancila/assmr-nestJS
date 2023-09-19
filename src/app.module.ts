import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './controllers/address/address.module';
import { SignupModule } from './controllers/signup/signup.module';
import { SignupService } from './service/signup/signup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entity/signup/signup.entity';
import { SigninService } from './service/signin/signin.service';
import { SigninModule } from './controllers/signin/signin.module';

@Module({
  imports: [AddressModule, SignupModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'assmr',
      entities: [Account], // list your entity here
      synchronize: true
    }),
    SigninModule
  ],
  controllers: [AppController],
  providers: [AppService, SignupService, SigninService],
})
export class AppModule {}
