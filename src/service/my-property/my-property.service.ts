import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle, VehicleImage } from 'src/entity/my-property/my-property';
import { User } from 'src/entity/signup/signup.entity';
import {
  MyVehiclePropertyModel,
  UpdateVehicleInformationModel,
} from 'src/models/my-property/MyProperty';
import { VehicleOwnerModel } from 'src/models/user/UserModel';
import { Repository } from 'typeorm';

@Injectable()
export class MyPropertyService {
  constructor(
    @InjectRepository(Vehicle) private vehicleEntity: Repository<Vehicle>,
    @InjectRepository(VehicleImage)
    private vehicleIMGEntity: Repository<VehicleImage>,
    @InjectRepository(User) private userEntity: Repository<User>,
  ) {}
  async uploadVehicleProperty(
    uploaderInfo: VehicleOwnerModel,
    pathLists: string[],
  ): Promise<ResponseData<[]>> {
    const activeUser = await this.userEntity.findOne({
      select: {
        id: true,
      },
      where: {
        email: uploaderInfo.email,
      },
    });

    const uploadInfo = {
      userId: activeUser.id,
      brand: uploaderInfo.brand,
      model: uploaderInfo.model,
      owner: uploaderInfo.owner,
      downpayment: uploaderInfo.downpayment,
      location: uploaderInfo.location,
      installmentpaid: uploaderInfo.installmentpaid,
      installmentduration: uploaderInfo.installmentduration,
      delinquent: uploaderInfo.delinquent,
      description: uploaderInfo.description,
    };

    const vehicle = await this.vehicleEntity
      .createQueryBuilder()
      .insert()
      .into(Vehicle)
      .values(uploadInfo)
      .execute();

    const vehicleID = vehicle.raw.insertId;

    this.vehicleIMGEntity
      .createQueryBuilder()
      .insert()
      .into(VehicleImage)
      .values({
        vehicleId: vehicleID,
        vehicleFrontIMG: JSON.stringify(pathLists),
      })
      .execute();

    const response: ResponseData<[]> = {
      code: 1,
      status: 200,
      message: 'Vehicle Property was uploaded.',
      data: [],
    };

    return response;
  }
  async getActiveUserProperty(
    email: string,
  ): Promise<ResponseData<MyVehiclePropertyModel[]>> {
    const activeUser = await this.userEntity.findOne({
      select: {
        id: true,
      },
      where: {
        email: email,
      },
    });

    const userId = activeUser.id;

    const res = await this.vehicleEntity
      .createQueryBuilder('vehicle')
      .innerJoinAndMapMany(
        'vehicle.vehicleIMG',
        'vehicle_image',
        'vehicle_image',
        'vehicle_image.vehicleID = vehicle.id',
      )
      .where('vehicle.userID =:userID', { userID: userId })
      .getMany();

    return {
      code: 0,
      status: 200,
      message: 'Fetching vehicle properties',
      data: res,
    };
  }
  async getCertainVehicle(vehicleID: number) {
    const vehicle = await this.vehicleEntity
      .createQueryBuilder('vehicle')
      .leftJoinAndSelect('vehicle.vehicleImages', 'vehicleIMG')
      .where('vehicle.id =:vehicleID', { vehicleID })
      .getOne();

    return {
      code: 200,
      status: 1,
      message: 'You certain vehicle',
      data: vehicle,
    };
  }
  async updateCertainVehicle(
    vehicleInfo: UpdateVehicleInformationModel,
  ): Promise<ResponseData<string>> {
    const { brand } = vehicleInfo;

    return {
      code: 200,
      status: 1,
      message: `Certain vehicle update.`,
      data: `${brand} Vehicle was updated.`,
    };
  }
}
