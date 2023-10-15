/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Messages,
  ReceiverMessage,
  SenderMessage,
} from 'src/entity/messages/Messages';
import { User } from 'src/entity/signup/signup.entity';
import {
  IChatSendMessageModel,
  IChatWithListModel,
  IChatWithMessagesModel,
  IChatWithModel,
} from 'src/models/messages/MessagesModel';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages) private messagesEntity: Repository<Messages>,
    @InjectRepository(User) private userEntity: Repository<User>,
    @InjectRepository(ReceiverMessage)
    private receiverMessEntity: Repository<ReceiverMessage>,
    @InjectRepository(SenderMessage)
    private senderMessEntity: Repository<SenderMessage>,
  ) {}
  async getIChatWith({
    activeUser,
    otherUser,
  }: IChatWithModel): Promise<ResponseData<IChatWithMessagesModel[]>> {
    const messages = await this.messagesEntity
      .createQueryBuilder('messages')
      .leftJoinAndSelect('messages.receiverMessage', 'receiver_message')
      .leftJoinAndSelect('messages.senderMessage', 'sender_message')
      .where(`receiver_message.email ='${activeUser}'`)
      .andWhere(`sender_message.email ='${otherUser}'`)
      .orWhere(`receiver_message.email ='${otherUser}'`)
      .andWhere(`sender_message.email ='${activeUser}'`)
      .getMany();
    console.log(messages);

    return {
      code: 200,
      status: 1,
      message: 'IChatWith Records.',
      data: messages as unknown as IChatWithMessagesModel[],
    }; // if naa siyay converstation sa laen user go here...
    return {
      code: 205,
      status: 1,
      message: 'IChatWith Records.',
      data: [],
    };
  }
  async iSendMessageWith(
    messageData: IChatSendMessageModel,
  ): Promise<ResponseData<string>> {
    const { receiverId, senderId, message, activeUser, otherUser } =
      messageData;

    const receiverRes = await this.messagesEntity
      .createQueryBuilder('messages')
      .insert()
      .into(ReceiverMessage)
      .values({
        email: otherUser,
        userId: receiverId,
      })
      .execute();
    const recResId = receiverRes.raw.insertId;

    const senderRes = await this.messagesEntity
      .createQueryBuilder('senderMessage')
      .insert()
      .into(SenderMessage)
      .values({
        email: activeUser,
        userId: senderId,
      })
      .execute();
    const sendResId = senderRes.raw.insertId;

    this.receiverMessEntity
      .createQueryBuilder('messages')
      .insert()
      .into(Messages)
      .values({
        senderId: senderId,
        receiverId: receiverId,
        receiverMessageId: recResId,
        senderMessageId: sendResId,
        message,
        date: new Date(),
      })
      .execute();

    return {
      code: 200,
      status: 1,
      message: 'Message was sent.',
      data: 'Message was send successfully.',
    };
  }
  async getAllMyChatLists(
    param: any,
  ): Promise<ResponseData<IChatWithListModel[]>> {
    const { userId, activeUserEmail } = param;
    const subQuery = this.messagesEntity
      .createQueryBuilder('messages')
      .select('MAX(messages.id)', 'max')
      .groupBy('messages.senderId, messages.receiverId');

    const messageList = await this.messagesEntity
      .createQueryBuilder('messages')
      .leftJoinAndSelect('messages.receiverMessage', 'receiver_message')
      .leftJoinAndSelect('messages.senderMessage', 'sender_message')
      .leftJoinAndSelect('receiver_message.user', 'user1')
      .leftJoinAndSelect('sender_message.user', 'user2')
      .where('receiver_message.email =:receiver_email', {
        receiver_email: activeUserEmail,
      })
      .orWhere('sender_message.email =:sender_email', {
        sender_email: activeUserEmail,
      })
      .where(`messages.id IN (${subQuery.getQuery()})`)
      .getMany();

    return {
      code: 200,
      status: 1,
      message: 'allMy Chattlists',
      data: messageList as unknown as IChatWithListModel[],
    };
  }
}
