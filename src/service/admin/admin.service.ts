import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
<<<<<<< Updated upstream
import { Jewelry } from 'src/entity/my-property/my-jewelry';
=======
import { JewelryEntity } from 'src/entity/my-property/my-jewelry';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    @InjectRepository(Jewelry)
    private Jewelry: Repository<Jewelry>,
=======
    @InjectRepository(JewelryEntity)
    private jewelryEntity: Repository<JewelryEntity>,
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      .andWhere('property.id = assumpt.propertyId')
=======
>>>>>>> Stashed changes
      .select([
        'vehicle',
        'userOwner',
        'userAssumer',
        'assumer',
        'assumpt',
        'property',
      ])
<<<<<<< Updated upstream
      .groupBy('assumpt.id')
=======
      .groupBy('vehicle.id')
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      .andWhere('property.id = assumpt.propertyId')
=======
>>>>>>> Stashed changes
      .select([
        'realestate',
        'userOwner',
        'userAssumer',
        'assumer',
        'assumpt',
        'property',
      ])
<<<<<<< Updated upstream
      .groupBy('assumpt.id')
      .getRawMany();

    const jewelry = await this.Jewelry.createQueryBuilder('jewelry')
=======
      .groupBy('realestate.id')
      .getRawMany();

    const jewelry = await this.jewelryEntity
      .createQueryBuilder('jewelry')
>>>>>>> Stashed changes
      .innerJoin(Assumer, 'assumer')
      .innerJoin(Assumption, 'assumpt')
      .innerJoin(User, 'userAssumer')
      .innerJoin(User, 'userOwner')
      .innerJoin(Property, 'property')
      .where('jewelry.propertyId = assumpt.propertyId')
      .andWhere('jewelry.propertyId = property.id')
      .andWhere('userAssumer.id = assumpt.userId')
      .andWhere('userOwner.id = property.userId')
<<<<<<< Updated upstream
      .andWhere('property.id = assumpt.propertyId')
=======
>>>>>>> Stashed changes
      .select([
        'jewelry',
        'userOwner',
        'userAssumer',
        'assumer',
        'assumpt',
        'property',
      ])
<<<<<<< Updated upstream
      .groupBy('assumpt.id')
      .getRawMany();

    concatResult = [...vehicle, ...realestate, ...jewelry];

=======
      .groupBy('jewelry.id')
      .getRawMany();

    concatResult = [...vehicle, ...realestate, ...jewelry];
    console.log(concatResult);
>>>>>>> Stashed changes
    return {
      code: 200,
      status: 1,
      message: 'Admin histories',
      data: concatResult,
    };
  }
}
