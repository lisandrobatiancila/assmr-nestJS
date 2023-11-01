import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from 'src/entity/my-property/my-property';
import { DashboardGetGraphsModel } from 'src/models/dashboard/DashboardModels';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepo: Repository<Vehicle>,
  ) {}
  async getDashboardGraphs(
    userId: string,
  ): Promise<ResponseData<DashboardGetGraphsModel>> {
    const totalPostedVehicle = await this.vehicleRepo
      .createQueryBuilder('vehicle')
      .getCount();

    // console.log(totalPostedVehicle);

    return {
      code: 200,
      status: 1,
      message: 'Get Dashboard graphs.',
      data: {
        totalVehicle: totalPostedVehicle,
        totalJewelry: 0,
        totalRealestate: 0,
      },
    };
  }
}
