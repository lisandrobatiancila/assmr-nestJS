import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './controllers/address/address.module';
import { SignupModule } from './controllers/signup/signup.module';
import { SignupService } from './service/signup/signup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, User } from './entity/signup/signup.entity';
import { SigninService } from './service/signin/signin.service';
import { SigninModule } from './controllers/signin/signin.module';
import { MyPropertyModule } from './controllers/my-property/my-property.module';
import { MyPropertyService } from './service/my-property/my-property.service';
import { Vehicle, VehicleImage } from './entity/my-property/my-property';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PropertyAssumptionsController } from './controllers/property-assumptions/property-assumptions.controller';
import { PropertyAssumptionsModule } from './controllers/property-assumptions/property-assumptions.module';
import { PropertyAsssumptionsService } from './service/property-asssumptions/property-asssumptions.service';
import {
  Assumer,
  Assumption,
} from './entity/property-assumption/PropertyAssumption';
<<<<<<< Updated upstream
=======
import { AssumedPropertyService } from './service/assumed-property/assumed-property.service';
import { AssumedPropertyController } from './controllers/assumed-property/assumed-property.controller';
import { AssumedPropertyModule } from './controllers/assumed-property/assumed-property.module';
import { MessagesModule } from './controllers/messages/messages.module';
import { Messages, ReceiverMessage, SenderMessage } from './entity/messages/Messages';
>>>>>>> Stashed changes

@Module({
  imports: [
    AddressModule,
    SignupModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'assmr',
      entities: [
        User,
        Account,
        Vehicle,
        VehicleImage,
        Assumer,
        Assumption,
        Messages,
        ReceiverMessage,
        SenderMessage,
      ], // list your entity here
      synchronize: true,
    }),
    SigninModule,
    MyPropertyModule,
    PropertyAssumptionsModule,
<<<<<<< Updated upstream
  ],
  controllers: [AppController, PropertyAssumptionsController],
=======
    AssumedPropertyModule,
    MessagesModule,
  ],
  controllers: [
    AppController,
    PropertyAssumptionsController,
    AssumedPropertyController,
  ],
>>>>>>> Stashed changes
  providers: [
    AppService,
    SignupService,
    SigninService,
    MyPropertyService,
    PropertyAsssumptionsService,
  ],
})
export class AppModule {}
