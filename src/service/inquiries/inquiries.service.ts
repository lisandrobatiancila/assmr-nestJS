import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inquiries } from 'src/entity/inquiries/Inquiries';
import { Notifications } from 'src/entity/notifications/Notifications';
import { InquiriesModel } from 'src/models/inquiries/Inquiries';
import { Repository } from 'typeorm';

@Injectable()
export class InquiriesService {
  constructor(
    @InjectRepository(Inquiries) private inquiryEntity: Repository<Inquiries>,
    @InjectRepository(Notifications)
    private notificationEntity: Repository<Notifications>,
  ) {}
  async sendInquiries(inquiry: InquiriesModel): Promise<ResponseData<string>> {
    const {
      userSenderId,
      userReceiverId,
      propertyId,
      firstname,
      lastname,
      address,
      streetAddress,
      addressLine2,
      stateProvince,
      postalZipCode,
      phoneNumber,
      email,
      inquiryDescription,
    } = inquiry;

    this.inquiryEntity
      .createQueryBuilder('inquiry')
      .insert()
      .into(Inquiries)
      .values({
        userSenderId,
        userReceiverId,
        propertyId,
        firstname,
        lastname,
        address,
        streetAddress,
        streetAddressLine2: addressLine2,
        stateOProvince: stateProvince,
        zipCode: postalZipCode,
        phoneNumber,
        email,
        description: inquiryDescription,
      })
      .execute();

    this.notificationEntity
      .createQueryBuilder('notification')
      .insert()
      .into(Notifications)
      .values({
        userNotifReceiverId: userReceiverId,
        userNotifSenderId: userSenderId,
        notificationType: 'inquiries',
        notificationContent: 'Someone send an inquiries',
        isSeen: 'false',
        notificationDate: new Date(),
      })
      .execute();
    return {
      code: 200,
      status: 1,
      message: 'Inquiry send',
      data: 'Your inquiry has been successfully send.',
    };
  }
  getAllInquiries(userId: number) {
    console.log(userId);
  }
}
