import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFeedBack } from 'src/entity/feedbacks/FeedBacks';
import { UserFeedBacksModel } from 'src/models/feedbacks/FeedBacks';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(UserFeedBack)
    private userFeedBackEntity: Repository<UserFeedBack>,
  ) {}
  async postUserFeedBack(
    param: UserFeedBacksModel,
  ): Promise<ResponseData<string>> {
    const { userId, email, fullName, feedComments, satisfaction } = param;
    this.userFeedBackEntity
      .createQueryBuilder('feedback')
      .insert()
      .into(UserFeedBack)
      .values({
        userId,
        email,
        fullName,
        userComments: feedComments,
        satisfaction,
        feedBackDate: new Date(),
      })
      .execute();

    return {
      code: 200,
      status: 1,
      message: 'Feedback posted',
      data: 'Thank you for your feedback.',
    };
  }
  async getUserFeedBacks(): Promise<ResponseData<UserFeedBacksModel[]>> {
    const feedBackList = await this.userFeedBackEntity
      .createQueryBuilder('feedbacks')
      .getMany();

    // console.log(feedBackList);
    return {
      code: 200,
      status: 1,
      message: 'Lists of all user feedbacks',
      data: feedBackList as unknown as UserFeedBacksModel[],
    };
  }
}
