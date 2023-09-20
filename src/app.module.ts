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
import { MyPropertyController } from './controllers/my-property/my-property.controller';
import { MyPropertyModule } from './controllers/my-property/my-property.module';
import { MyPropertyService } from './service/my-property/my-property.service';

@Module({
  imports: [AddressModule, SignupModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'assmr2',
      entities: [Account], // list your entity here
      synchronize: true
    }),
    SigninModule,
    MyPropertyModule
  ],
  controllers: [AppController],
  providers: [AppService, SignupService, SigninService, MyPropertyService],
})
export class AppModule {}
