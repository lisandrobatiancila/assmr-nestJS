import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbacksService } from 'src/service/feedbacks/feedbacks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFeedBack } from 'src/entity/feedbacks/FeedBacks';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbacksService],
  imports: [TypeOrmModule.forFeature([UserFeedBack])],
  exports: [TypeOrmModule],
})
export class FeedbackModule {}
