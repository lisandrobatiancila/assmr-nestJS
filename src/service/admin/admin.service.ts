import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JewelryEntity } from 'src/entity/my-property/my-jewelry';
import { Vehicle } from 'src/entity/my-property/my-property';
import {
  Realeststate,
  HouseAndLot,
  House,
  Lot,
} from 'src/entity/my-property/my-realestate';
import { Property } from 'src/entity/my-property/property';
import {
  Assumer,
  Assumption,
} from 'src/entity/property-assumption/PropertyAssumption';
import { User } from 'src/entity/signup/signup.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userEntity: Repository<User>,
    @InjectRepository(Assumer) private assumerEntity: Repository<Assumer>,
    @InjectRepository(Assumption)
    private assumptionEntity: Repository<Assumption>,
    @InjectRepository(Vehicle) private vehicleEntity: Repository<Vehicle>,
    @InjectRepository(Realeststate)
    private realestateEntity: Repository<Realeststate>,
    @InjectRepository(JewelryEntity)
    private jewelryEntity: Repository<JewelryEntity>,
    @InjectRepository(HouseAndLot) private halEntity: Repository<HouseAndLot>,
    @InjectRepository(House) private houseEntity: Repository<House>,
    @InjectRepository(Lot) private lotEntity: Repository<Lot>,
    @InjectRepository(Property) private propertyEntity: Repository<Property>,
  ) {}
  async getHistory(): Promise<ResponseData<any>> {
    let concatResult = [];
    const vehicle = await this.vehicleEntity
      .createQueryBuilder('vehicle')
      .innerJoin(Assumer, 'assumer')
      .innerJoin(Assumption, 'assumpt')
      .innerJoin(User, 'userAssumer')
      .innerJoin(User, 'userOwner')
      .innerJoin(Property, 'property')
      .where('vehicle.propertyId = assumpt.propertyId')
      .andWhere('userAssumer.id = assumpt.userId')
      .andWhere('userOwner.id = property.userId')
      .select([
        'vehicle',
        'userOwner',
        'userAssumer',
        'assumer',
        'assumpt',
        'property',
      ])
      .groupBy('vehicle.id')
      .getRawMany();

    const realestate = await this.realestateEntity
      .createQueryBuilder('realestate')
      .innerJoin(Assumer, 'assumer')
      .innerJoin(Assumption, 'assumpt')
      .innerJoin(User, 'userAssumer')
      .innerJoin(User, 'userOwner')
      .innerJoin(Property, 'property')
      .where('realestate.propertyId = assumpt.propertyId')
      .andWhere('realestate.propertyId = property.id')
      .andWhere('userAssumer.id = assumpt.userId')
      .andWhere('userOwner.id = property.userId')
      .select([
        'realestate',
        'userOwner',
        'userAssumer',
        'assumer',
        'assumpt',
        'property',
      ])
      .groupBy('realestate.id')
      .getRawMany();

    const jewelry = await this.jewelryEntity
      .createQueryBuilder('jewelry')
      .innerJoin(Assumer, 'assumer')
      .innerJoin(Assumption, 'assumpt')
      .innerJoin(User, 'userAssumer')
      .innerJoin(User, 'userOwner')
      .innerJoin(Property, 'property')
      .where('jewelry.propertyId = assumpt.propertyId')
      .andWhere('jewelry.propertyId = property.id')
      .andWhere('userAssumer.id = assumpt.userId')
      .andWhere('userOwner.id = property.userId')
      .select([
        'jewelry',
        'userOwner',
        'userAssumer',
        'assumer',
        'assumpt',
        'property',
      ])
      .groupBy('jewelry.id')
      .getRawMany();

    concatResult = [...vehicle, ...realestate, ...jewelry];
    console.log(concatResult);
    return {
      code: 200,
      status: 1,
      message: 'Admin histories',
      data: concatResult,
    };
  }
}
