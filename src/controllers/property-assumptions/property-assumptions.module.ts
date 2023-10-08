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

@Module({
  controllers: [PropertyAssumptionsController],
  providers: [PropertyAsssumptionsService],
  imports: [TypeOrmModule.forFeature([User, Vehicle, Assumer, Assumption])],
  exports: [TypeOrmModule],
})
export class PropertyAssumptionsModule {}
