import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Assumer,
  Assumption,
} from 'src/entity/property-assumption/PropertyAssumption';
import { AssumptionInformationModel } from 'src/models/assumed-property/AssumedProperty';
import { Repository } from 'typeorm';

@Injectable()
export class AssumedPropertyService {
  constructor(
    @InjectRepository(Assumer) private assumerEntity: Repository<Assumer>,
    @InjectRepository(Assumption)
    private assumptnEntity: Repository<Assumption>,
  ) {}
  async getAllAssumedProperty(param: {
    userId: number;
  }): Promise<ResponseData<AssumptionInformationModel[]>> {
    const { userId } = param;
    const assumed_records = await this.assumerEntity
      .createQueryBuilder('assumer')
      .innerJoin('assumption', 'assumption')
      .innerJoin('user', 'user')
      .innerJoin('vehicle', 'vehicle')
      .innerJoin('vehicle_image', 'vehicle_image')
      .select(['user', 'assumption', 'vehicle', 'vehicle_image'])
      .distinct()
      .where('user.id = assumption.propowner_id')
      .andWhere('vehicle.userId = user.id')
      .andWhere('vehicle.id = vehicle_image.vehicleId')
      .andWhere('assumer.userId =:userId', { userId })
      .andWhere('assumption.userId =:userId', { userId })
      .andWhere('assumption.property_id = vehicle.id')

      .andWhere('assumption.isActive =:isActive', { isActive: '1' })
      // .getQuery();
      .execute();

    return {
      code: 200,
      status: 1,
      message: 'Assumed properties.',
      data: assumed_records,
    };
  }
  async removeRemovedAssumption(
    assumerID: number,
  ): Promise<ResponseData<string>> {
    this.assumptnEntity
      .createQueryBuilder('assumer')
      .update(Assumption)
      .set({
        isActive: '0',
      })
      .where('assumer.id =:assumerID', { assumerID })
      .execute();

    return {
      code: 200,
      status: 1,
      message: 'Assumption was removed.',
      data: 'Assumption was removed successfully.',
    };
  }
}
