import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle, VehicleImage } from 'src/entity/my-property/my-property';
import {
  Assumer,
  Assumption,
} from 'src/entity/property-assumption/PropertyAssumption';
import { User } from 'src/entity/signup/signup.entity';
import {
  AssumerListModel,
  MyVehiclePropertyModel,
  UpdateVehicleInformationModel,
} from 'src/models/my-property/MyProperty';
import { VehicleOwnerModel } from 'src/models/user/UserModel';
import { In, Repository } from 'typeorm';

@Injectable()
export class MyPropertyService {
  constructor(
    @InjectRepository(Vehicle) private vehicleEntity: Repository<Vehicle>,
    @InjectRepository(VehicleImage)
    private vehicleIMGEntity: Repository<VehicleImage>,
    @InjectRepository(User) private userEntity: Repository<User>,
    @InjectRepository(Assumer) private assumerEntity: Repository<Assumer>,
    @InjectRepository(Assumption)
    private assumptionEntity: Repository<Assumption>,
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
      isDropped: '0',
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
    const subQ = await this.vehicleEntity
      .createQueryBuilder('vv')
      .innerJoin(Assumption, 'asmpt', 'asmpt.property_id = vv.id')
      .innerJoin(
        Assumer,
        'asmr',
        'asmr.id = asmpt.assumerId AND vehicle.id = vv.id',
      )
      .select('COUNT(vv.id)')
      .getSql();

    const res = await this.vehicleEntity
      .createQueryBuilder('vehicle')
      .innerJoinAndMapMany(
        'vehicle.vehicleIMG',
        'vehicle_image',
        'vehicle_image',
        'vehicle_image.vehicleID = vehicle.id',
      )
      .andWhere('vehicle.userID =:userID', { userID: userId })
      .andWhere('vehicle.isDropped = 0')
      .select(['vehicle', 'vehicle_image', `(${subQ}) as totalAssumption`])
      .getRawMany();

    // console.log(res);
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
    const {
      id,
      brand,
      model,
      owner,
      downpayment,
      location,
      installmentpaid,
      installmentduration,
      delinquent,
      description,
    }: UpdateVehicleInformationModel = vehicleInfo;

    this.vehicleEntity
      .createQueryBuilder('vehicle')
      .update(Vehicle)
      .set({
        brand,
        model,
        owner,
        downpayment,
        location,
        installmentpaid,
        installmentduration,
        delinquent,
        description,
      })
      .where('vehicle.id =:vehicleID', { vehicleID: id })
      .execute();

    return {
      code: 200,
      status: 1,
      message: `Certain vehicle update.`,
      data: `${brand} Vehicle was updated.`,
    };
  }
  async removeCertainVehicle(param: any): Promise<ResponseData<string>> {
    const { vehicleID } = param;
    this.vehicleEntity
      .createQueryBuilder('vehicle')
      .update(Vehicle)
      .set({
        isDropped: '1',
      })
      .where('vehicle.id =:vehicleID', { vehicleID })
      .execute();
    console.log(vehicleID);

    return {
      code: 200,
      status: 1,
      message: 'Vehicle was removed.',
      data: 'Certain vehicle was removed.',
    };
  }
  async getAllMyAssumedProperty(param: { userId: number }) {
    console.log(param);

    const assumer = await this.assumerEntity
      .createQueryBuilder('assumer')
      .where('userId =:userId', { userId: 1 })
      .select(['transaction_date']);

    console.log(assumer);
  }
  async listAssumerOfMyProperty(
    propertyId: number,
  ): Promise<ResponseData<AssumerListModel>> {
    const assumerList = await this.assumerEntity
      .createQueryBuilder('assumer')
      .leftJoinAndSelect(Assumption, 'asmpt', 'asmpt.assumerId = assumer.id')
      .leftJoinAndSelect(Vehicle, 'vehicle', 'vehicle.id = asmpt.property_id')
      .leftJoinAndSelect(User, 'user', 'user.id = assumer.userId')
      .where('asmpt.property_id =:propertyId', { propertyId })
      .select(['user', 'assumer', 'asmpt'])
      .getRawMany();
    console.log(assumerList);
    return {
      code: 200,
      status: 1,
      message: 'Assumer list',
      data: assumerList as unknown as AssumerListModel,
    };
  }
  async removeAssumer(userId: number) {
    console.log(userId);
  }
}
