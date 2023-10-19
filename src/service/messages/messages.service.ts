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
import { Repository, getConnection } from 'typeorm';
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
      .leftJoinAndSelect(
        ReceiverMessage,
        'receiverMess',
        'messages.receiverMessageId = receiverMess.id',
      )
      .leftJoinAndSelect(
        SenderMessage,
        'senderMess',
        'senderMess.id = messages.senderMessageId',
      )
      .leftJoinAndSelect(
        User,
        'userReceiver',
        'receiverMess.userId = userReceiver.id',
      )
      .leftJoinAndSelect(
        User,
        'userSender',
        'senderMess.userId = userSender.id',
      )
      .select(['messages', 'userReceiver', 'userSender', 'receiverMess',
      'senderMess'])
      .where('userReceiver.email =:receiverEmail', {
        receiverEmail: activeUser,
      })
      .orWhere('userSender.email =:senderEmail', { senderEmail: otherUser })
      .orWhere('userReceiver.email =:receiverEmail', {
        receiverEmail: otherUser,
      })
      .orWhere('userSender.email =:senderEmail', { senderEmail: activeUser })
      .groupBy('messages.id')
      // .getRawMany();
      .getQuery()
      console.log(messages);
      
    return {
      code: 200,
      status: 1,
      message: 'IChatWith Records.',
      data: [],
      // data: messages as unknown as IChatWithMessagesModel[],
    }; // if naa siyay converstation sa laen user go here...
  }
  async iSendMessageWith(
    messageData: IChatSendMessageModel,
  ): Promise<ResponseData<string>> {
    const { receiverId, senderId, message, activeUser, otherUser } =
      messageData;

    const receiverRes = await this.receiverMessEntity
      .createQueryBuilder('messages')
      .insert()
      .into(ReceiverMessage)
      .values({
        email: otherUser,
        userId: receiverId,
      })
      .execute();
    const recResId = receiverRes.raw.insertId;

    const senderRes = await this.senderMessEntity
      .createQueryBuilder('senderMessage')
      .insert()
      .into(SenderMessage)
      .values({
        email: activeUser,
        userId: senderId,
      })
      .execute();
    const sendResId = senderRes.raw.insertId;

    this.messagesEntity
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
    // select * from messages m INNER JOIN user u ON u.id = m.senderId OR u.id = m.receiverId INNER JOIN receiver_message rm ON rm.id = m.receiverMessageId INNER JOIN sender_message sm ON sm.id = m.senderId WHERE (rm.email ='klent@gmail.com' AND sm.email = 'maica@gmail.com' OR rm.email ='maica@gmail.com' AND sm.email = 'klent@gmail.com') AND (rm.email ='maica@gmail.com' AND sm.email = 'klent@gmail.com' OR rm.email ='klent@gmail.com' AND sm.email = 'maica@gmail.com') GROUP by m.senderMessageId, m.receiverMessageId
    const { userId, activeUserEmail } = param;
    const subQuery = this.messagesEntity
      .createQueryBuilder('messages')
      .select('MAX(messages.id)', 'max')
      .groupBy('messages.senderId, messages.receiverId');

    const messageList = await this.messagesEntity
      .createQueryBuilder('messages')
      .innerJoin(ReceiverMessage, 'receiverMess', 'messages.receiverMessageId=receiverMess.id')
      .innerJoin(SenderMessage, 'senderMess', 'messages.senderMessageId=senderMess.id')
      .innerJoin(User, 'userRes', 'userRes.id = receiverMess.userId OR senderMess.userId = userRes.id')
      .innerJoin(User, 'userSend', 'userSend.id = senderMess.userId')
      
      .where('receiverMess.email =:receiver_email', {
        receiver_email: activeUserEmail,
      })
      .orWhere('senderMess.email =:sender_email', {
        sender_email: activeUserEmail,
      })
      .orWhere('receiverMess.email =:receiver_email', {
        receiver_email: activeUserEmail,
      })
      .orWhere('senderMess.email =:sender_email', {
        sender_email: activeUserEmail,
      })
      .where(`messages.id IN (${subQuery.getQuery()})`)

      .select(['messages', 'receiverMess', 'senderMess', 'userRes', 'userSend'])
      .groupBy('userRes.id')
      .getRawMany();
      // .getSql()
    
      console.log(messageList);
      
    return {
      code: 200,
      status: 1,
      message: 'allMy Chattlists',
      data: messageList as unknown as IChatWithListModel[],
    };
  }
}
