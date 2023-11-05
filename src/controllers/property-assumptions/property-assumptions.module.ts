import { Module } from '@nestjs/common';
import { PropertyAssumptionsController } from './property-assumptions.controller';
import { PropertyAsssumptionsService } from 'src/service/property-asssumptions/property-asssumptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/signup/signup.entity';
import { Vehicle } from 'src/entity/my-property/my-property';
import {
  Assumer,
  Assumption,
} from 'src/entity/property-assumption/PropertyAssumption';
import { Notifications } from 'src/entity/notifications/Notifications';
import { House, HouseAndLot, Lot, Realeststate } from 'src/entity/my-property/my-realestate';
<<<<<<< Updated upstream
import { Jewelry } from 'src/entity/my-property/my-jewelry';
=======
import { JewelryEntity } from 'src/entity/my-property/my-jewelry';
>>>>>>> Stashed changes

@Module({
  controllers: [PropertyAssumptionsController],
  providers: [PropertyAsssumptionsService],
  imports: [
    TypeOrmModule.forFeature([
      User,
      Vehicle,
      Assumer,
      Assumption,
      Notifications,
      Realeststate,
      HouseAndLot,
      House,
      Lot,
<<<<<<< Updated upstream
      Jewelry,
=======
      JewelryEntity,
>>>>>>> Stashed changes
    ]),
  ],
  exports: [TypeOrmModule],
})
export class PropertyAssumptionsModule {}
