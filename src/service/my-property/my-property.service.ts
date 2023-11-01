import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JewelryEntity } from 'src/entity/my-property/my-jewelry';
import { Vehicle, VehicleImage } from 'src/entity/my-property/my-property';
import {
  House,
  HouseAndLot,
  Lot,
  Realeststate,
} from 'src/entity/my-property/my-realestate';
import {
  Assumer,
  Assumption,
} from 'src/entity/property-assumption/PropertyAssumption';
import { User } from 'src/entity/signup/signup.entity';
import {
  AssumerListModel,
  MyJewelryPropertyModel,
  MyVehiclePropertyModel,
  UpdateJewelryInformationModel,
  UpdateVehicleInformationModel,
} from 'src/models/my-property/MyProperty';
import {
  JewelryOwnerModel,
  RealestateOwnerModel,
  VehicleOwnerModel,
} from 'src/models/user/UserModel';
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
    @InjectRepository(JewelryEntity)
    private jewelryEntity: Repository<JewelryEntity>,
    @InjectRepository(Realeststate)
    private realestateEntity: Repository<Realeststate>,
    @InjectRepository(HouseAndLot) private halEntity: Repository<HouseAndLot>,
    @InjectRepository(House) private houseEntity: Repository<House>,
    @InjectRepository(Lot) private lotEntity: Repository<Lot>,
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
        'asmr.id = asmpt.assumerId AND vehicle.id = vv.id AND asmpt.isActive = 1',
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
      .where('vehicle.userID =:userID', { userID: userId })
      .andWhere('vehicle.isDropped = 0')
      .select(['vehicle', 'vehicle_image', `(${subQ}) as totalAssumption`])
      .getRawMany();
    // .getSql();

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
    // console.log(vehicleID);

    return {
      code: 200,
      status: 1,
      message: 'Vehicle was removed.',
      data: 'Certain vehicle was removed.',
    };
  }
  async getAllMyAssumedProperty(param: { userId: number }) {
    // console.log(param);

    const assumer = await this.assumerEntity
      .createQueryBuilder('assumer')
      .where('userId =:userId', { userId: 1 })
      .select(['transaction_date']);

    // console.log(assumer);
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
      .andWhere('asmpt.isActive =:isActive', { isActive: 1 })
      .select(['user', 'assumer', 'asmpt'])
      .getRawMany();
    // console.log(assumerList);
    return {
      code: 200,
      status: 1,
      message: 'Assumer list',
      data: assumerList as unknown as AssumerListModel,
    };
  }
  async removeAssumer(userId: number): Promise<ResponseData<string>> {
    this.assumptionEntity
      .createQueryBuilder('assumption')
      .update(Assumption)
      .set({ isActive: '0' })
      .where('assumption.userId =:userId', { userId })
      .execute();

    return {
      code: 200,
      status: 1,
      message: 'removing assumption',
      data: 'Assumer was removed',
    };
  }
  async uploadJewelryProperty(
    uploaderInfo: JewelryOwnerModel,
    pathLists: string[],
  ) {
    const {
      email,
      jewelryName,
      jewelryModel,
      owner,
      downpayment,
      location,
      installmentpaid,
      installmentduration,
      delinquent,
      description,
      karat,
      grams,
      material,
    } = uploaderInfo;

    const user = await this.userEntity
      .createQueryBuilder('user')
      .select(['id'])
      .where('email =:userEmail', { userEmail: email })
      .execute();

    this.jewelryEntity
      .createQueryBuilder('jewelries')
      .insert()
      .into(JewelryEntity)
      .values({
        user: () => (user.id = user[0].id),
        jewelry_owner: owner,
        jewelry_name: jewelryName,
        jewelry_model: jewelryModel,
        jewelry_downpayment: downpayment.toString(),
        jewelry_location: location,
        jewelry_delinquent: delinquent,
        jewelry_installmentpaid: installmentpaid.toString(),
        jewelry_installmentduration: installmentduration,
        jewelry_description: description,
        jewelry_karat: karat,
        jewelry_grams: grams,
        jewelry_material: material,
        jewelry_image: JSON.stringify(pathLists),
        isDropped: '0',
      })
      .execute();

    const response: ResponseData<[]> = {
      code: 1,
      status: 200,
      message: 'Jewelry Property was uploaded.',
      data: [],
    };

    return response;
  }
  async getActiveUserJewelry(param: {
    email: string;
  }): Promise<ResponseData<MyJewelryPropertyModel[]>> {
    const { email } = param;

    const subQ = await this.jewelryEntity
      .createQueryBuilder('jj')
      .innerJoin(Assumption, 'asmpt', 'asmpt.property_id = jj.id')
      .innerJoin(
        Assumer,
        'asmr',
        'asmr.id = asmpt.assumerId AND asmpt.isActive = 1',
      )
      .select('COUNT(jj.id)')
      .getSql();

    const user = await this.userEntity
      .createQueryBuilder('user')
      .select(['id'])
      .where('email =:email', { email })
      .getRawOne();

    const jewelries = await this.jewelryEntity
      .createQueryBuilder('jewelry')
      .select(['jewelry', `(${subQ}) as totalAssumption`])
      .where('userId =:userId', { userId: user.id })
      .andWhere('jewelry.isDropped =0')
      .execute();
    // .getQuery();

    // console.log(jewelries);
    return {
      code: 200,
      status: 1,
      message: 'Jewelry property was uploaded.',
      data: jewelries,
    };
  }
  async getCertainJewelry(
    jewelryId: number,
  ): Promise<ResponseData<MyJewelryPropertyModel>> {
    const jewelry = await this.jewelryEntity
      .createQueryBuilder('jewelry')
      .select(['jewelry'])
      .where('id =:id', { id: jewelryId })
      .getRawOne();
    // console.log(jewelry);
    return {
      code: 200,
      status: 1,
      message: 'Certain jewelry.',
      data: jewelry,
    };
  }
  async updateCertainJewelry(
    jewelryInfo: UpdateJewelryInformationModel,
  ): Promise<ResponseData<string>> {
    const {
      id,
      owner,
      jewelryName,
      jewelryModel,
      downpayment,
      location,
      installmentpaid,
      installmentduration,
      delinquent,
      description,
      karat,
      grams,
      material,
    } = jewelryInfo;
    this.jewelryEntity
      .createQueryBuilder('jewelry')
      .update(JewelryEntity)
      .set({
        jewelry_owner: owner,
        jewelry_name: jewelryName,
        jewelry_model: jewelryModel,
        jewelry_location: location,
        jewelry_downpayment: downpayment,
        jewelry_installmentpaid: installmentpaid,
        jewelry_installmentduration: installmentduration,
        jewelry_delinquent: delinquent,
        jewelry_description: description,
        jewelry_karat: karat,
        jewelry_grams: grams,
        jewelry_material: material,
      })
      .where('id =:jewelryId', { jewelryId: id })
      .execute();

    return {
      code: 200,
      status: 1,
      message: `Certain jewelry update.`,
      data: `'very nice' Jewelry was updated.`,
    };
  }
  async removeCertainJewelry(param: {
    jewelryID: number;
  }): Promise<ResponseData<string>> {
    const { jewelryID } = param;

    this.jewelryEntity
      .createQueryBuilder('jewelry')
      .update(JewelryEntity)
      .set({
        isDropped: '1',
      })
      .where('id =:jewelryID', { jewelryID })
      .execute();

    return {
      code: 200,
      status: 1,
      message: 'Jewelry was removed.',
      data: 'Certain jewelry was removed.',
    };
  }
  async getActiveUserRealestate(param: {
    email: string;
    realestateType: string;
  }) {
    console.log(param);

    return {};
  }
  async uploadRealestateProperty(
    uploaderInfo: RealestateOwnerModel,
    pathLists: string[],
  ) {
    const {
      email,
      realestateType,
      owner,
      developer,
      downpayment,
      location,
      installmentpaid,
      installmentduration,
      delinquent,
      description,
    } = uploaderInfo;
    console.log(uploaderInfo);
    // console.log(pathLists);

    const user = await this.userEntity
      .createQueryBuilder('user')
      .select(['id'])
      .where('email =:email', { email })
      .getRawOne();

    const { id } = user;

    const realestate = await this.realestateEntity
      .createQueryBuilder('realestate')
      .insert()
      .into(Realeststate)
      .values({
        owner: owner,
        realestateType: realestateType,
        location: location,
        downpayment: downpayment.toString(),
        installmentpaid: installmentpaid.toString(),
        installmentduration,
        delinquent,
        description,
        userId: () => (user.userId = id),
      })
      .execute();
    const { insertId } = realestate.raw;

    switch (realestateType) {
      case 'house and lot':
        this.halEntity
          .createQueryBuilder('hal')
          .insert()
          .into(HouseAndLot)
          .values({
            developer,
            realestateId: insertId,
            hal_front_image: JSON.stringify(pathLists),
          })
          .execute();
        break;
      case 'house':
        this.houseEntity
          .createQueryBuilder('house')
          .insert()
          .into(House)
          .values({
            developer,
            realestateId: insertId,
            house_front_image: JSON.stringify(pathLists),
          })
          .execute();
        break;
      case 'lot':
        this.lotEntity
          .createQueryBuilder('lot')
          .insert()
          .into(House)
          .values({
            realestateId: insertId,
            house_front_image: JSON.stringify(pathLists),
          })
          .execute();
        break;
      default:
        console.log('No realestateType');
    }
  }
}
