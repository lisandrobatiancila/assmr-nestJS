import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { Vehicle } from 'src/entity/my-property/my-property';
import { User } from 'src/entity/signup/signup.entity';
import { VehicleAssumptionModel } from 'src/models/property-assumptions/PropertyAssumptions';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PropertyAsssumptionsService {
  constructor(
    @InjectRepository(Vehicle) private vehicleEntity: Repository<Vehicle>,
    @InjectRepository(User) private userEntity: Repository<User>, private dataSource: DataSource
  ) {}
  async getAllVehicles(): Promise<ResponseData<VehicleAssumptionModel[]>> {
    const properties = await this.userEntity
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.vehicles', 'vehicle')
      .leftJoinAndSelect('vehicle.vehicleImages', 'vehicle_image')
      .where('user.id = vehicle.userId')
      .andWhere('vehicle.id = vehicle_image.vehicleId')
      .select([
        'user.id',
        'user.firstname',
        'user.middlename',
        'user.lastname',
        'user.contactno',
        'user.municipality',
        'user.province',
        'user.barangay',
        'user.email',
        'vehicle',
        'vehicle_image',
      ])
      .getMany() as VehicleAssumptionModel[];
      console.log(properties);
      
      return {
        code: 200,
        status: 1,
        message: "vehicle assumption",
        data: properties
      }
  }
  // for assumptions purposes
}
