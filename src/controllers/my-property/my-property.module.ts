import { Module } from '@nestjs/common';
import { MyPropertyController } from './my-property.controller';
import { Vehicle, VehicleImage } from 'src/entity/my-property/my-property';
import { MyPropertyService } from 'src/service/my-property/my-property.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/signup/signup.entity';
import {
  Assumer,
  Assumption,
} from 'src/entity/property-assumption/PropertyAssumption';
import { JewelryEntity } from 'src/entity/my-property/my-jewelry';
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
import {
  House,
  HouseAndLot,
  Lot,
  Realeststate,
} from 'src/entity/my-property/my-realestate';
<<<<<<< Updated upstream
=======
import { Property } from 'src/entity/my-property/property';
>>>>>>> Stashed changes
>>>>>>> Stashed changes

@Module({
  controllers: [MyPropertyController],
  providers: [MyPropertyService],
  imports: [
    TypeOrmModule.forFeature([
      Vehicle,
      VehicleImage,
      User,
      Assumer,
      Assumption,
      JewelryEntity,
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
      Realeststate,
      HouseAndLot,
      House,
      Lot,
<<<<<<< Updated upstream
=======
      Property
>>>>>>> Stashed changes
>>>>>>> Stashed changes
    ]),
  ],
  exports: [TypeOrmModule],
})
export class MyPropertyModule {}
