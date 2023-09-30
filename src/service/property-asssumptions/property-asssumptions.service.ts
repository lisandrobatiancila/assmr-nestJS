import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from 'src/entity/my-property/my-property';
import { User } from 'src/entity/signup/signup.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PropertyAsssumptionsService {
  constructor(
    @InjectRepository(Vehicle) private vehicleEntity: Repository<Vehicle>,
    @InjectRepository(User) private userEntity: Repository<User>,
  ) {}
  async getAllVehicles() {
    const properties = await this.userEntity
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.vehicles', 'vehicle')
      .leftJoinAndSelect('vehicle.vehicleImages', 'vehicle_image')
      .where('user.id = vehicle.userId')
      .andWhere('vehicle.id = 1')
      .select([
        'user.id',
        'user.firstname',
        'user.middlename',
        'user.lastname',
        'vehicle',
        'vehicle_image',
      ])
      .getMany();

    console.log(JSON.stringify(properties));
  }
  // for assumptions purposes
}
