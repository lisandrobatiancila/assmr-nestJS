/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Get, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from 'src/entity/my-property/my-property';
import {
  Assumer,
  Assumption,
} from 'src/entity/property-assumption/PropertyAssumption';
import { User } from 'src/entity/signup/signup.entity';
import {
  CertainVehicleModel,
  PropertyAssumptionModel,
  VehicleAssumptionModel,
  VehicleForAssumptionInformationModel,
} from 'src/models/property-assumptions/PropertyAssumptions';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PropertyAsssumptionsService {
  constructor(
    @InjectRepository(Vehicle) private vehicleEntity: Repository<Vehicle>,
    @InjectRepository(User) private userEntity: Repository<User>,
    @InjectRepository(Assumer) private assumerEntity: Repository<Assumer>,
    @InjectRepository(Assumption)
    private assumptionEntity: Repository<Assumption>,
    private dataSource: DataSource,
  ) {}
  async getAllVehiclesBackUp(): Promise<
    ResponseData<VehicleAssumptionModel[]>
  > {
    // const properties = (await this.userEntity
    //   .createQueryBuilder('user')
    //   .leftJoinAndSelect('user.vehicles', 'vehicle')
    //   .leftJoinAndSelect('vehicle.vehicleImages', 'vehicle_image')
    //   .where('user.id = vehicle.userId')
    //   .andWhere('vehicle.id = vehicle_image.vehicleId')
    //   .select([
    //     'user.id',
    //     'user.firstname',
    //     'user.middlename',
    //     'user.lastname',
    //     'user.contactno',
    //     'user.municipality',
    //     'user.province',
    //     'user.barangay',
    //     'user.email',
    //     'vehicle',
    //     'vehicle_image',
    //   ])
    // .getMany()) as VehicleAssumptionModel[];

    return {
      code: 200,
      status: 1,
      message: 'vehicle assumption',
      data: [],
    };
  }
  async getAllVehicles(): Promise<ResponseData<VehicleAssumptionModel[] | []>> {
    const entity = await this.vehicleEntity
      .createQueryBuilder('vehicle')
      .innerJoinAndSelect('vehicle.vehicleImages', 'vehicleImages')
      .where('vehicle.id = vehicleImages.vehicleId')
      .getMany();
    return {
      code: 200,
      status: 1,
      message: 'vehicle assumption',
      data: entity,
    };
  }
  // for assumptions purposes
  async getCertainVehicle(param: {
    vehicleId: number;
  }): Promise<ResponseData<CertainVehicleModel[]>> {
    const { vehicleId } = param;
    const vehicle = await this.vehicleEntity
      .createQueryBuilder('vehicle')
      .innerJoin('vehicle.vehicleImages', 'vehicleImages')
      .where('vehicle.id = :vehicleId', { vehicleId })
      .select([
        'userId',
        'brand',
        'model',
        'owner',
        'downpayment',
        'location',
        'installmentpaid',
        'delinquent',
        'description',
        'vehicleImages',
      ])
      .execute();

    return {
      code: 200,
      status: 1,
      message: 'Get certain vehicle',
      data: vehicle,
    };
  }
  async assumeVehicleProperty(
    @Body() assumptionForm: PropertyAssumptionModel,
  ): Promise<ResponseData<string>> {
    const {
      userID,
      propertyID,
      ownerID,
      firstname,
      middlename,
      lastname,
      contactno,
      address,
      job,
      monthSalary,
    } = assumptionForm;

    const checkIfAssumedAlready = await this.assumptionEntity
      .createQueryBuilder()
      .where('user_id =:userID', { userID })
      .andWhere('property_id =:propertyID', { propertyID })
      .getCount();

    if (checkIfAssumedAlready > 0) {
      return {
        code: 409,
        status: 0,
        message: 'You can not assume twice of this property.',
        data: 'Duplicate assumption.',
      };
    }
    const assumerResp = await this.assumerEntity
      .createQueryBuilder()
      .insert()
      .into(Assumer)
      .values({
        user_id: userID,
        assumer_income: monthSalary,
        assumer_work: job,
      })
      .execute();
    const assumerID = assumerResp.raw.insertId;

    this.assumerEntity
      .createQueryBuilder()
      .insert()
      .into(Assumption)
      .values({
        user_id: userID,
        property_id: propertyID,
        assumer_id: assumerID,
        propowner_id: ownerID,
        transaction_date: new Date(),
      })
      .execute();

    return {
      code: 200,
      status: 1,
      message: 'Property was assumed successfully.',
      data: 'Successfully assumed.',
    };
  }
  async getCertainVehicle(param: {
    vehicleId: number;
  }): Promise<ResponseData<CertainVehicleModel[]>> {
    const { vehicleId } = param;
    const vehicle = await this.vehicleEntity
      .createQueryBuilder('vehicle')
      .innerJoin('vehicle.vehicleImages', 'vehicleImages')
      .where('vehicle.id = :vehicleId', { vehicleId })
      .select([
        'userId',
        'brand',
        'model',
        'owner',
        'downpayment',
        'location',
        'installmentpaid',
        'delinquent',
        'description',
        'vehicleImages',
      ])
      .execute();

    return {
      code: 200,
      status: 1,
      message: 'Get certain vehicle',
      data: vehicle,
    };
  }
  async assumeVehicleProperty(
    @Body() assumptionForm: PropertyAssumptionModel,
  ): Promise<ResponseData<string>> {
    const {
      userID,
      propertyID,
      ownerID,
      firstname,
      middlename,
      lastname,
      contactno,
      address,
      job,
      monthSalary,
    } = assumptionForm;

    const checkIfAssumedAlready = await this.assumptionEntity
      .createQueryBuilder()
      .where('user_id =:userID', { userID })
      .andWhere('property_id =:propertyID', { propertyID })
      .getCount();

    if (checkIfAssumedAlready > 0) {
      return {
        code: 409,
        status: 0,
        message: 'You can not assume twice of this property.',
        data: 'Duplicate assumption.',
      };
    }
    const assumerResp = await this.assumerEntity
      .createQueryBuilder()
      .insert()
      .into(Assumer)
      .values({
        user_id: userID,
        assumer_income: monthSalary,
        assumer_work: job,
      })
      .execute();
    const assumerID = assumerResp.raw.insertId;

    this.assumerEntity
      .createQueryBuilder()
      .insert()
      .into(Assumption)
      .values({
        user_id: userID,
        property_id: propertyID,
        assumerId: assumerID,
        propowner_id: ownerID,
        transaction_date: new Date(),
      })
      .execute();

    return {
      code: 200,
      status: 1,
      message: 'Property was assumed successfully.',
      data: 'Successfully assumed.',
    };
  }
}
